import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const { order } = await readBody(event)

  let isValid = true
  const prisma = new PrismaClient()

  // eslint-disable-next-line node/prefer-global/process
  const stripe = new Stripe(process.env.STRIPE_SK_KEY as string, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2023-10-16',
  })

  if (!order || !order.name || !order.street || !order.city || !order.country || !order.zipcode || !order.products) {
    throw createError({
      statusCode: 400,
      message: 'Order is required',
    },
    )
  }

  // check if products exist
  await Promise.all(order.products.map(async (product: any) => {
    if (!product.id || !product.selectedQuantity) {
      isValid = false
      throw createError({
        statusCode: 400,
        message: 'Product id and quantity are required',
      },
      )
    }

    if (product.selectedQuantity < 1) {
      isValid = false
      throw createError({
        statusCode: 400,
        message: 'Quantity must be greater than 0',
      },
      )
    }

    try {
      const productFromDb = await prisma.products.findUnique({
        where: {
          id: product.id,
        },
        include: {
          stock: {
            select: {
              quantity: true,
              size: true,
            },
          },
        },
      })

      if (!productFromDb) {
        isValid = false
        throw createError({
          statusCode: 400,
          message: 'Product not found',
        },
        )
      }
      const stock = productFromDb.stock.find((stockItem: any) => stockItem.size === product.selectedSize && stockItem.quantity >= product.selectedQuantity)
      if (!stock) {
        isValid = false
        throw createError({
          statusCode: 400,
          message: 'Product not found',
        },
        )
      }

      // finally check if the price is correct
      const DBprice = ((productFromDb.price - (productFromDb.price * productFromDb.discount / 100)) * product.selectedQuantity) / 100
      if (DBprice !== product.totalPrice) {
        isValid = false
        throw createError({
          statusCode: 400,
          message: 'Price is not correct',
        },
        )
      }
    }
    catch (e) {
      console.error(e)
    }
    finally {
      await prisma.$disconnect()
    }
  },
  ))

  if (!isValid) {
    throw createError({
      statusCode: 400,
      message: 'Order is not valid',
    },
    )
  }
  else {
  // now we can create the order
    try {
      const totalPrice = order.products.reduce((acc: number, product: any) => acc + product.totalPrice, 0) * 100
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice,
        currency: 'eur',
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          emailOfCustomer: order.email,
          nameOfCustomer: order.name,
          addressOfCustomer: `${order.street}, ${order.zipcode} ${order.city}, ${order.country}`,
          items: JSON.stringify(order.products),
        },
        shipping: {
          name: order.name,
          address: {
            line1: order.street,
            city: order.city,
            country: order.country,
            postal_code: order.zipcode,
          },
        },
        receipt_email: order.email,
      })

      return {
        clientSecret: paymentIntent.client_secret,
      }
    }
    catch (e) {
      console.error(e)
      throw createError({
        statusCode: 500,
        statusMessage: (e as Error).message,
      },
      )
    }
  }
})

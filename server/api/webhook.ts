import Stripe from 'stripe'
import { Prisma, PrismaClient } from '@prisma/client'
import useSendEmailVerification from '~/server/emails/useSendEmailVerification'

// https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/pages/api/webhooks/index.ts

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const addOrderToDb = async (order: any) => {
    const createdOrder = await prisma.orders.create({
      data: {
        name: order.name,
        street: order.street,
        city: order.city,
        country: order.country,
        zipcode: order.zipcode,
        stripeId: order.stripeId,
      },
    })

    const orderId = createdOrder.id

    await Promise.all(order.products.map(async (product: any) => {
      const productFromDb = await prisma.products.findUnique({
        where: {
          id: product.id,
        },
        include: {
          stock: {
            select: {
              quantity: true,
              size: true,
              id: true,
            },
            where: {
              size: product.selectedSize,
            },
          },
        },
      })

      console.log('productFromDb:', productFromDb)

      if (productFromDb) {
        await prisma.orderItems.create({
          data: {
            quantity: product.selectedQuantity,
            size: product.selectedSize,
            products: {
              connect: {
                id: product.id,
              },
            },
            orders: {
              connect: {
                id: orderId,
              },
            },
          },
        })

        const newQuantity = productFromDb.stock[0].quantity - product.selectedQuantity

        console.log('newQuantity:', newQuantity)

        await prisma.stock.update({
          where: {
            id: productFromDb.stock[0].id,
          },
          data: {
            quantity: newQuantity,
          },
        })
      }
    }))

    const customerEmail = order.email
    const customersProducts = order.products.map((product: any) => {
      return {
        productName: product.title,
        quantity: product.selectedQuantity,
        size: product.selectedSize,
        price: product.totalPrice,
      }
    },
    )
    const customerTotal = order.products.reduce((acc: number, product: any) => {
      return acc + product.totalPrice
    }, 0)

    const customerName = order.name
    useSendEmailVerification(customerEmail, 'purchase', customerName, customersProducts, customerTotal)
  }

  // eslint-disable-next-line node/prefer-global/process
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2023-10-16',
  })
  const headers = event.node.req.headers

  const body = await readRawBody(event)
  const sig = headers['stripe-signature']
  let hookEvent: Stripe.Event

  try {
    hookEvent = stripe.webhooks.constructEvent(
      body as string,
      sig as string,
      // eslint-disable-next-line node/prefer-global/process
      process.env.ENDPOINT_SECRET as string,
    )
  }
  catch (err) {
    console.log('Error message:', err)
    throw createError({ statusCode: 400, message: (err as Error).message })
  }

  // console.log('The webhook event object:', hookEvent)

  switch (hookEvent.type) {
    case 'payment_intent.created': {
      console.log('payment_intent.created')
      console.log('event is:', hookEvent.data.object)
      console.log('metadata are:', hookEvent.data.object.metadata)
      break
    }
    case 'payment_intent.succeeded': {
      const intentSucceeded = hookEvent.data.object
      console.log('payment_intent.succeeded', intentSucceeded)
      console.log(`\n\n-------\n`)
      break
    }
    case 'charge.succeeded':{
      const chargeSucceeded = hookEvent.data.object
      console.log('charge was successful!', chargeSucceeded)

      const shipping = hookEvent.data.object.shipping
      const address = shipping?.address

      const products = JSON.parse(hookEvent.data.object.metadata.items)

      const order = {
        name: shipping?.name,
        street: address?.line1,
        city: address?.city,
        country: address?.country,
        zipcode: address?.postal_code,
        products,
        stripeId: hookEvent.data.object.id,
        email: hookEvent.data.object.receipt_email,
      }

      console.log('order is:', order)

      await addOrderToDb(order)

      break
    }
    //   // ... handle other event types
    default:
      console.log(`Unhandled event type ${hookEvent.type}`)
  }
})

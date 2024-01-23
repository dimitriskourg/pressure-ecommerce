import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    const distinct_categories = await prisma.products.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    })

    const distinct_prices = await prisma.products.findMany({
      select: {
        price: true,
      },
      distinct: ['price'],
    })

    const distinct_discounts = await prisma.products.findMany({
      select: {
        discount: true,
      },
      distinct: ['discount'],
    })

    const distinct_sizes = await prisma.stock.findMany({
      select: {
        size: true,
      },
      distinct: ['size'],
    })

    const distinct_colors = await prisma.stock.findMany({
      select: {
        color: true,
      },
      distinct: ['color'],
    })

    const total_filters = {
      categories: distinct_categories,
      prices: distinct_prices,
      discounts: distinct_discounts,
      sizes: distinct_sizes,
      colors: distinct_colors,
    }
    return total_filters
  }
  catch (e) {
    console.error(e)
  }
  finally {
    await prisma.$disconnect()
  }
})

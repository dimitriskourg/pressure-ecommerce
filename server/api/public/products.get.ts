import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

// prisma.$on('query', (e) => {
//   console.log(`Query: ${e.query}`)
//   console.log(`Params: ${e.params}`)
//   console.log(`Duration: ${e.duration}ms`)
// })

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const fromIndex = Number(query.fromIndex) || 0
  const toIndex = Number(query.toIndex) || 10
  const minQuantity = Number(query.minQuantity) || 1
  const sortBy = query.sortBy || 'price_asc'
  const priceRange = String(query.priceRange) || '0_100000'
  const priceRangeArray = priceRange.split('_')
  const minPrice = Number(priceRangeArray[0]) || 0
  const maxPrice = Number(priceRangeArray[1]) || 100000
  let categories: string[] = query.categories ? (Array.isArray(query.categories) ? query.categories : [query.categories]) : []
  const sizes: string[] = query.sizes ? (Array.isArray(query.sizes) ? query.sizes : [query.sizes]) : []
  const colors: string[] = query.colors ? (Array.isArray(query.colors) ? query.colors : [query.colors]) : []

  let categoriesFilters: any = []

  if (categories.length > 0) {
    categories = categories.filter(Boolean)
    categoriesFilters = categories.map((category: string) => {
      return {
        category: {
          contains: category,
          mode: 'insensitive',
        },
      }
    })
  }

  try {
    const productsInRange = await prisma.products.findMany({
      // skip: fromIndex,
      // take: toIndex - fromIndex,
      where: {
        stock: {
          some: {
            quantity: {
              gte: minQuantity,
            },
          },
        },
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
        ...(categoriesFilters.length > 0 && { OR: categoriesFilters }),
      },
      include: {
        stock: {
          select: {
            size: true,
            color: true,
            quantity: true,
          },
          where: {
            quantity: {
              gte: minQuantity,
            },
          },
        },
      },
      orderBy: {
        // Sorting based on different scenarios: price_asc, price_desc, newest
        ...(sortBy === 'price_asc' && { price: Prisma.SortOrder.asc }),
        ...(sortBy === 'price_desc' && { price: Prisma.SortOrder.desc }),
        ...(sortBy === 'newest' && { createdAt: Prisma.SortOrder.desc }), // Assuming 'createdAt' field exists for ordering by newest
      },
    })

    let finalResult = productsInRange.filter((product) => {
      let sizesFilters = true
      let colorsFilters = true
      if (sizes.length > 0)
        sizesFilters = product.stock.some(stock => stock.size && sizes.includes(stock.size))
      if (colors.length > 0)
        colorsFilters = product.stock.some(stock => stock.color && colors.includes(stock.color))
      return sizesFilters && colorsFilters
    })

    // get only the products in the range
    const totalProducts = finalResult.length
    finalResult = finalResult.slice(fromIndex, toIndex)

    return {
      totalProducts,
      products: finalResult,
    }
  }
  catch (e) {
    console.error(e)
  }
  finally {
    await prisma.$disconnect()
  }
})

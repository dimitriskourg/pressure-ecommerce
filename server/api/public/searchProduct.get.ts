import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const searchPhrase = String(query.searchPhrase) || ''

  if (searchPhrase === '') {
    throw createError({
      statusCode: 400,
      message: 'Search phrase is required',
    },
    )
  }

  try {
    const products = await prisma.products.findMany({
      take: 10,
      where: {
        title: {
          contains: searchPhrase,
          mode: 'insensitive',
        },
      },
      include: {
        stock: {
          select: {
            quantity: true,
          },
        },
      },
    })
    return products
  }
  catch (e) {
    console.error(e)
  }
  finally {
    await prisma.$disconnect()
  }
})

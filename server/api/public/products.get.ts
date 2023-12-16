import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const fromIndex = Number(query.fromIndex) || 0
  const toIndex = Number(query.toIndex) || 10
  const minQuantity = Number(query.minQuantity) || 1

  try {
    const productsInRange = await prisma.products.findMany({
      skip: fromIndex,
      take: toIndex - fromIndex,
      where: {
        stock: {
          some: {
            quantity: {
              gte: minQuantity, // Filter products where at least one stock item has quantity >= minQuantity
            },
          },
        },
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
              gte: minQuantity, // Additional filtering on stock level to ensure quantity >= minQuantity
            },
          },
        },
      },
    })
    return productsInRange
  }
  catch (e) {
    console.error(e)
  }
  finally {
    await prisma.$disconnect()
  }
})

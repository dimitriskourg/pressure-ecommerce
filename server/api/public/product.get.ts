import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = Number(query.id) || 0

  if (id === 0)
    return createError({ statusCode: 400, message: 'Bad Request' })

  try {
    const product = await prisma.products.findUnique({
      where: { id },
      include: {
        stock: {
          select: {
            size: true,
            color: true,
            quantity: true,
          },
        },
      },
    })
    return product
  }
  catch (e) {
    console.error(e)
  }
  finally {
    await prisma.$disconnect()
  }
})

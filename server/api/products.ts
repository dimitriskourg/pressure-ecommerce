import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async () => {
  const prisma = new PrismaClient()

  const data = await prisma.products.findMany({
    select: {
      title: true,
    },
  })

  return data
})

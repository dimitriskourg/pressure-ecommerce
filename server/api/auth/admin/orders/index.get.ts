import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  let user = null
  try {
    user = await serverSupabaseUser(event)
  }
  catch (e) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  if (!user || user.role !== 'eshop_admin')
    throw createError({ statusCode: 401, message: 'Unauthorized' })

  const query = getQuery(event)
  const fromIndex = Number(query.fromIndex) || 0
  const take = Number(query.take) || 100

  const orders = await prisma.orders.findMany({
    skip: fromIndex,
    take,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return orders
})

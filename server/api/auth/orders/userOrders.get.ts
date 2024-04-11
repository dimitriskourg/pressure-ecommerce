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
  if (!user)
    throw createError({ statusCode: 401, message: 'Unauthorized' })

  const query = getQuery(event)
  const latest = !!query.latest

  // if the user wants the latest orders, return the latest 3 orders max of the user
  if (latest) {
    const data = await prisma.orders.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    })
    return data
  }

  // else return all the orders of the user
  const data = await prisma.orders.findMany({
    where: {
      user_id: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return data
})

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
  const id = query.id

  if (!id)
    throw createError({ statusCode: 400, message: 'Bad Request' })

  try {
    const data = await prisma.orders.findUnique({
      where: {
        id: Number(id),
        user_id: user.id,
      },
      include: {
        orderItems: {
          include: {
            products: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })
    if (!data)
      throw createError({ statusCode: 404, message: 'Order not found.' })
    return data
  }
  catch (e) {
    throw createError({ statusCode: 500, message: 'Error fetching order.' })
  }
})

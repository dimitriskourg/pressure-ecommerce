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

  console.log('user', user.role)

  const data = await prisma.users.findMany(
    {
      select: {
        id: true,
        email: true,
        role: true,
      },
      where: {
        role: 'eshop_admin',
      },
    },
  )
  return data
})

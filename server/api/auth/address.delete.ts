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
  const { id } = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Error, no address id provided.',
    })
  }

  try {
    // check if this address belongs to this user
    await prisma.addresses.delete({
      where: {
        id,
        user_id: user.id,
      },
    })
  }
  catch (e) {
    throw createError({
      statusCode: 500,
      message: 'Error deleting this address.',
    })
  }

  return { message: 'Address deleted successfully.' }
})

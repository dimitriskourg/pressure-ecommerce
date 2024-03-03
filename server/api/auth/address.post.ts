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
  const { newAddress } = await readBody(event)

  if (!newAddress || !newAddress.name || !newAddress.street || !newAddress.city || !newAddress.country || !newAddress.zipcode) {
    throw createError({
      statusCode: 400,
      message: 'Please provide all address fields',
    })
  }

  try {
    await prisma.addresses.create({
      data: {
        name: newAddress.name,
        street: newAddress.street,
        city: newAddress.city,
        country: newAddress.country,
        zipcode: newAddress.zipcode,
        user_id: user.id,
      },
    })
  }
  catch (e) {
    throw createError({
      statusCode: 500,
      message: 'Error creating address. Please try again later.',
    })
  }

  return { message: 'Address created successfully.' }
})

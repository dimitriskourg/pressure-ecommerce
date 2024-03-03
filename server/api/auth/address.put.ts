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
  const { editedAddress } = await readBody(event)

  if (!editedAddress || !editedAddress.name || !editedAddress.street || !editedAddress.city || !editedAddress.country || !editedAddress.zipcode) {
    throw createError({
      statusCode: 400,
      message: 'Please provide all address fields',
    })
  }

  try {
    await prisma.addresses.update({
      where: {
        id: editedAddress.id,
      },
      data: {
        name: editedAddress.name,
        street: editedAddress.street,
        city: editedAddress.city,
        country: editedAddress.country,
        zipcode: editedAddress.zipcode,
      },
    },
    )
  }
  catch (e) {
    throw createError({
      statusCode: 500,
      message: 'Error creating address. Please try again later.',
    })
  }

  return { message: 'Address created successfully.' }
})

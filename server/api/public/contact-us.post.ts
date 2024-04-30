import { PrismaClient } from '@prisma/client'
import sendEmailToAdmins from '~/server/emails/sendEmailToAdmins'

export default defineEventHandler(async (event) => {
  const question = await readBody(event)

  if (!question || !question.name || !question.email || !question.subject || !question.message) {
    throw createError({
      statusCode: 400,
      message: 'All fields are required',
    })
  }

  const prisma = new PrismaClient()
  const eshop_admins = await prisma.users.findMany(
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

  console.warn('eshop_admins', eshop_admins)

  const adminEmails = eshop_admins.map(admin => admin.email)

  console.warn('adminEmails', adminEmails)

  const ret = await sendEmailToAdmins(adminEmails, question.name, question.email, question.subject, question.message)

  if (ret.error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error sending email',
    })
  }
})

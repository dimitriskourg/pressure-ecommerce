import { Resend } from 'resend'

const config = useRuntimeConfig()
const resend = new Resend(config.resendPK)

export default defineEventHandler(async () => {
  // html template about the order

  const emailAddress = 'test@mail.com'

  try {
    const data = await resend.emails.send({
      from: 'Pressure <noreply@dimitriskourg.gr>',
      to: [emailAddress],
      subject: 'Hello world',
      html: '<strong>It works!</strong>',
    })

    console.log(data)
    return data
  }
  catch (error) {
    return { error }
  }
})

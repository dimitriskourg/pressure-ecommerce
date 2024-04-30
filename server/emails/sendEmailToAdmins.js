import { Resend } from 'resend'

const config = useRuntimeConfig()
const resend = new Resend(config.resendPK)

export default async function sendEmailToAdmins(adminEmailAddresses, fromUserName, fromUserEmail, subject, message) {
  const emailTemplate
    = `<p>Dear Admin,</p>
    <p>${fromUserName} (${fromUserEmail}) has sent you a message:</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <p>Best regards,</p>
    <p>Pressure</p>`

  try {
    const data = await resend.emails.send({
      from: 'Pressure [admin] <noreply@dimitriskourg.gr>',
      to: adminEmailAddresses,
      subject: `[ADMIN] New message from ${fromUserName}`,
      html: emailTemplate,
    })

    data.error ? console.warn('Email was not able to sent to the admins') : console.warn(`Email sent successfully to admins: ${adminEmailAddresses.join(', ')}`)
    return { error: data.error }
  }
  catch (error) {
    return { error }
  }
}

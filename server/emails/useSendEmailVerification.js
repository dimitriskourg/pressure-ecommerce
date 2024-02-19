import { Resend } from 'resend'
import { getPurchageConfirmationTemplate } from './purchaseConfirmationTemplate'

const config = useRuntimeConfig()
const resend = new Resend(config.resendPK)

export default async function useSendEmailVerification(emailAddress, mode, customerName, purchaseDetails, total) {
  const emailTemplates = [{
    name: 'purchase',
    subject: 'Your Order at Pressure',
    html: getPurchageConfirmationTemplate(customerName, purchaseDetails, total),
  }, {
    name: 'refund',
    subject: 'Your refund',
    html: 'You got your money back',
  }, {
    name: 'verification',
    subject: 'Verify your email',
    html: 'Please verify your email',
  }]

  try {
    const data = await resend.emails.send({
      from: 'Pressure <noreply@dimitriskourg.gr>',
      to: emailAddress,
      subject: emailTemplates.find(t => t.name === mode).subject,
      html: emailTemplates.find(t => t.name === mode).html,
    })

    console.log(data)
    return data
  }
  catch (error) {
    return { error }
  }
}

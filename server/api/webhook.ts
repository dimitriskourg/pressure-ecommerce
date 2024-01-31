import Stripe from 'stripe'

// https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/pages/api/webhooks/index.ts

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line node/prefer-global/process
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2023-10-16',
  })
  const headers = event.node.req.headers

  const body = await readRawBody(event)
  const sig = headers['stripe-signature']
  let hookEvent: Stripe.Event

  try {
    hookEvent = stripe.webhooks.constructEvent(
      body as string,
      sig as string,
      // eslint-disable-next-line node/prefer-global/process
      process.env.ENDPOINT_SECRET as string,
    )
  }
  catch (err) {
    throw createError({ statusCode: 400, message: (err as Error).message })
  }

  console.log('The webhook event object:', hookEvent)

  switch (hookEvent.type) {
    case 'payment_intent.created':
      console.log('payment_intent.created')
      break
    case 'payment_intent.succeeded':
      const intentSucceeded = hookEvent.data.object
      console.log('payment_intent.succeeded', intentSucceeded)
      break
    case 'charge.succeeded':
      const chargeSucceeded = hookEvent.data.object
      console.log('charge was successful!', chargeSucceeded)
      break
    //   // ... handle other event types
    default:
      console.log(`Unhandled event type ${hookEvent.type}`)
  }
})

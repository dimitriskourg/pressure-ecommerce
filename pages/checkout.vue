<script setup>
import { AlertCircle, Loader2 } from 'lucide-vue-next'
import { loadStripe } from '@stripe/stripe-js'
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const userStore = useUserStore()

const config = useRuntimeConfig()

const name = ref('')
const street = ref('')
const city = ref('')
const country = ref('')
const zipcode = ref('')
const email = ref('')

let stripe = null
let elements = null

const loading = ref(true)
const errorMessage = ref('')
const disableSubmit = ref(false)

onBeforeMount(async () => {
  if (userStore.checkout.length === 0)
    return navigateTo('/cart')
})

onMounted(async () => {
  stripe = await loadStripe(config.public.STRIPE_PUBLIC_KEY)
  elements = stripe.elements({
    mode: 'payment',
    amount: 1000,
    currency: 'eur',
  })

  const paymentElement = elements.create('payment')
  paymentElement.mount('#payment-element')

  loading.value = false
})

async function onPlaceOrder() {
  if (loading.value)
    return
  if (!stripe || !elements)
    return
  loading.value = true

  const { error: submitError } = await elements.submit()
  if (submitError) {
    loading.value = false
    return
  }

  // check if all fields are filled
  if (!name.value || !street.value || !city.value || !country.value || !zipcode.value || !email.value) {
    loading.value = false
    return errorMessage.value = 'Please fill in all Shipping information'
  }

  const order = {
    name: name.value,
    street: street.value,
    city: city.value,
    country: country.value,
    zipcode: zipcode.value,
    email: email.value,
    products: userStore.checkout.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        selectedSize: product.selectedSize,
        selectedQuantity: product.selectedQuantity,
        totalPrice: product.totalPrice,
      }
    }),
  }

  try {
  // create payment intents first and grab secret
    const { data: clientSecret, error } = await useFetch('/api/public/submitOrder', {
      method: 'POST',
      body: {
        order,
      },
    })

    const clntSecret = clientSecret.value.clientSecret

    if (error.value) {
      loading.value = false
      disableSubmit.value = true
      return errorMessage.value = 'An error occurred, Please try again later. You have not been charged.'
    }

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      clientSecret: clntSecret,
      confirmParams: {
        return_url: `${config.public.BASE_URL}/success`,
      },
    })

    loading.value = false
    if (stripeError)
      return errorMessage.value = stripeError?.message ?? 'An error occurred, Please try again later. You have not been charged.'
  }
  catch (error) {
    console.error('error 3:', error)
    loading.value = false
    return errorMessage.value = error?.message ?? 'An error occurred'
  }
  // userStore.clearCheckout()
  // return navigateTo('/')
}
</script>

<template>
  <MainLayout>
    <div class="flex flex-col">
      <main class="flex-1 p-4 md:p-6">
        <h1 class="text-2xl font-semibold mb-4">
          Checkout
        </h1>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-6">
            <CheckoutComponentsOrderSummary />
          </div>
          <div class="space-y-6">
            <CheckoutComponentsShippingInformation v-model:name="name" v-model:street="street" v-model:city="city" v-model:country="country" v-model:zipcode="zipcode" v-model:email="email" />
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form class="space-y-4">
                  <div class="space-y-2">
                    <Label html-for="cardDetails">Credit Card</Label>
                    <div id="payment-element" />
                  </div>
                </form>
              </CardContent>
              <CardFooter v-if="errorMessage">
                <Alert variant="destructive">
                  <AlertCircle class="w-4 h-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {{ errorMessage }}
                  </AlertDescription>
                </Alert>
              </CardFooter>
              <CardFooter v-if="!disableSubmit" class="flex justify-end">
                <Button v-if="!loading" variant="outline" class="bg-black text-white" @click="onPlaceOrder">
                  Place Order
                </Button>
                <Button v-else variant="outline" class="bg-black text-white" disabled>
                  <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

<script setup>
import { Loader2 } from 'lucide-vue-next'
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
  console.log('order', order)

  // create payment intents first and grab secret

  const { data: clientSecret, error } = await useFetch('/api/public/submitOrder', {
    method: 'POST',
    body: {
      order,
    },
  })
  console.log('clientSecret', clientSecret)
  loading.value = false
  // userStore.clearCheckout()
  // return navigateTo('/')
}
</script>

<template>
  <MainLayout>
    <div class="flex flex-col h-screen">
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
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
              <CardFooter class="flex justify-end">
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

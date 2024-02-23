<script setup>
import { CheckCircle } from 'lucide-vue-next'
import { useUserStore } from '~/stores/user'
import MainLayout from '~/layouts/MainLayout.vue'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const route = useRoute()

const orderId = computed(() => route.query?.payment_intent)

if (route.query?.redirect_status !== 'succeeded')
  navigateTo('/')

const userStore = useUserStore()

const totalPrice = ref(userStore.cart.reduce((acc, product) => {
  return acc + product.price / 100 * product.selectedQuantity
}, 0).toFixed(2))

userStore.clearCheckout()
userStore.clearCart()

const date = useState('date', () => new Date().toISOString())
</script>

<template>
  <MainLayout>
    <div class="flex flex-col items-center justify-center max-w-2xl min-h-[60vh] py-12 mx-auto gap-4 px-4">
      <div class="flex flex-col items-center gap-2 text-center">
        <CheckCircle class="h-16 w-16 text-green-500" />
        <h1 class="text-3xl font-bold">
          Purchase Successful
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Thank you for your purchase! Your order is confirmed.
        </p>
      </div>
      <Card class="w-full max-w-sm p-0">
        <CardContent class="p-4">
          <div class="grid text-sm mb-2">
            <div class="font-medium">
              Order number
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              #{{ orderId }}
            </div>
          </div>
          <div class="grid text-sm mb-2">
            <div class="font-medium">
              Date
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ date }}
            </div>
          </div>
          <div class="grid text-sm mb-2">
            <div class="font-medium">
              Total amount
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ totalPrice }} €
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex w-full p-4">
          <NuxtLink class="flex-1" to="/">
            <Button class="w-full hover:bg-black hover:text-white" variant="outline">
              Back to home
            </Button>
          </NuxtLink>
        </CardFooter>
      </Card>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

<script setup>
import { CheckCircle } from 'lucide-vue-next'
import { useUserStore } from '~/stores/user'
import MainLayout from '~/layouts/MainLayout.vue'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const userStore = useUserStore()

const totalPrice = ref(userStore.cart.reduce((acc, product) => {
  return acc + product.price / 100 * product.selectedQuantity
}, 0).toFixed(2))

userStore.clearCheckout()
userStore.clearCart()

const today = ref(new Date().toLocaleString())
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
          <div class="grid gap-1 text-sm">
            <div class="font-medium">
              Order number
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              #1234567890
            </div>
          </div>
          <div class="grid gap-1 text-sm">
            <div class="font-medium">
              Date
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ today }}
            </div>
          </div>
          <div class="grid gap-1 text-sm">
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

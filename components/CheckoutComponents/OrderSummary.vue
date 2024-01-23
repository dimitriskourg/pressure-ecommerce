import type product from '~/server/api/product';
import type product from '~/server/api/product';

<script setup>
import { useUserStore } from '~/stores/user'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const userStore = useUserStore()

const productsInCheckout = computed(() => {
  return userStore.checkout
})

const totalPrice = computed(() => {
  return userStore.checkout.reduce((acc, product) => {
    return acc + product.totalPrice
  }, 0)
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Order Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div v-for="product in productsInCheckout" :key="product.id" class="flex items-center justify-between">
          <div class="flex flex-col">
            <span>{{ product.title }}</span>
            <span class="text-sm text-gray-500">Size: {{ product.selectedSize }}, Quantity: {{ product.selectedQuantity }}</span>
          </div>
          <span>{{ product.totalPrice }}€</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex items-center justify-between font-semibold">
      <span>Total: </span>
      <span>{{ totalPrice }}€</span>
    </CardFooter>
  </Card>
</template>

<style lang="scss" scoped>

</style>

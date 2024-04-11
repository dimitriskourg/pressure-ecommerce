<script setup>
import { PackageSearch } from 'lucide-vue-next'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const { data: orders, pending: pendingOrders } = await useFetch('/api/auth/orders/userOrders', {
  headers: useRequestHeaders(['cookie']),
  query: {
    latest: true,
  },

})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Latest Orders</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="!pendingOrders" class="grid gap-2">
        <div v-for="order in orders" :key="order.id" class="flex justify-around items-center gap-4 hover:bg-gray-200 rounded-lg p-3">
          <NuxtLink :to="`/auth/orders/${order.id}`" class="flex justify-around items-center gap-4 w-full">
            <PackageSearch class="h-6 w-6" />
            <div class="grid gap-1">
              <h3 class="font-semibold">
                #{{ order.id }}
              </h3>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Placed on {{ new Date(order.createdAt).toDateString() }}
              </div>
            </div>
            <div class="text-lg font-bold ml-auto">
              {{ order.total / 100 }} €
            </div>
          </NuxtLink>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex items-center gap-2">
      <Button variant="outline" class="bg-black text-white hover:bg-white hover:text-black">
        <NuxtLink to="/auth/orders">
          View All Orders
        </NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>

<style lang="scss" scoped>

</style>

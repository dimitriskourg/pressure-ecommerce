<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import MainLayout from '~/layouts/MainLayout.vue'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const { id } = useRoute().params

definePageMeta({
  title: 'Auth',
  description: 'Auth page',
  middleware: ['auth'],
})

const { data: order, error, pending } = await useFetch('/api/auth/orders/userOrder', {
  query: {
    id,
  },
})

console.log(order.value)
</script>

<template>
  <MainLayout>
    <div>
      <div v-if="error">
        <h4>Something Went wrong</h4>
      </div>
      <div v-else-if="pending">
        <CommonLoading />
      </div>
      <div v-else>
        <div class="grid items-start gap-4 p-4 md:gap-8 md:p-6">
          <div class="flex items-center gap-4">
            <Button size="icon" variant="outline" @click="$router.back()">
              <ArrowLeft class="h-4 w-4" />
              <span class="sr-only">Back</span>
            </Button>
            <h1 class="font-semibold text-lg md:text-xl">
              Order #{{ order.id }}
            </h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="grid gap-2 md:grid-cols-2">
                <div class="flex items-center gap-2">
                  <div class="font-medium">
                    Order number
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    #{{ order.id }}
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="font-medium">
                    Customer
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ order.name }}
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="font-medium">
                    Stripe Id
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ order.stripeId }}
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <div class="font-medium">
                    Date
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ new Date(order.createdAt).toDateString() }}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="min-w-[150px]">
                      Name
                    </TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead class="text-right">
                      Price
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="item in order.orderItems" :key="item.id">
                    <TableCell class="font-medium">
                      {{ item.products.title }}
                    </TableCell>
                    <TableCell>{{ item.quantity }}</TableCell>
                    <TableCell>{{ item.size }}</TableCell>
                    <TableCell class="text-right">
                      {{ item.total / 100 }} €
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card class="max-w-sm">
            <CardHeader>
              <CardTitle>Shipping address</CardTitle>
            </CardHeader>
            <CardContent class="text-sm">
              <div>
                {{ order.name }}
                <br>
                {{ order.street }}
                <br>
                {{ order.city }}, {{ order.country }}, {{ order.zipcode }}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

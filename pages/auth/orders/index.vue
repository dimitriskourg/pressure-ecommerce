<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import MainLayout from '~/layouts/MainLayout.vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

definePageMeta({
  title: 'Auth',
  description: 'Auth page',
  middleware: ['auth'],
})

const { data: orders, pending: pendingOrders } = await useFetch('/api/auth/orders/userOrders', {
  headers: useRequestHeaders(['cookie']),
})
</script>

<template>
  <MainLayout>
    <div id="AccountDashboard">
      <div class="flex flex-col min-h-[60vh]">
        <header class="flex h-20 sm:h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <h1 class="text-xl font-bold">
            All Orders
          </h1>
        </header>
        <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div class="flex items-center gap-4">
            <Button size="icon" variant="outline">
              <NuxtLink to="/auth/account">
                <ArrowLeft class="h-4 w-4" />
                <span class="sr-only">Back</span>
              </NuxtLink>
            </Button>
          </div>
          <div v-if="orders.length === 0 ">
            <h1 class="text-2xl font-semibold mb-4">
              No Orders
            </h1>
          </div>
          <div v-else class="border shadow-sm rounded-lg p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="">
                    Order number
                  </TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead class="hidden md:table-cell">
                    Total
                  </TableHead>
                  <TableHead class="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="order in orders" :key="order.id">
                  <TableCell class="font-medium">
                    Order #{{ order.id }}
                  </TableCell>
                  <TableCell>{{ new Date(order.createdAt).toDateString() }}</TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ order.total / 100 }} €
                  </TableCell>
                  <TableCell class="text-right">
                    <Button size="sm" variant="outline">
                      <NuxtLink :to="`/auth/orders/${order.id}`">
                        View Order
                      </NuxtLink>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

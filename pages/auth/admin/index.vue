<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'
import { columns } from '~/components/AdminComponents/orders/columns'

definePageMeta({
  title: 'Admin',
  description: 'Admin page',
  middleware: ['admin'],
})

const { data: orders, error: ordersError, pending: ordersPending } = await useFetch('/api/auth/admin/orders', {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
  lazy: true,
  server: false,
  query: {
    fromIndex: 0,
    take: 100,
  },
})

if (orders !== null)
  console.warn(orders)
else
  console.warn('Orders is null')
</script>

<template>
  <MainLayout>
    <div id="AccountDashboard">
      <div class="flex flex-col min-h-[60vh]">
        <header class="flex h-14 lg:h-[60px] items-center gap-4 border-b -my-3 bg-slate-950 px-6 text-white">
          <h1 class="text-xl font-bold">
            Admin Dashboard
          </h1>
        </header>
        <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div class="flex items-center gap-4">
            <h1 class="font-semibold text-lg md:text-xl">
              Your Account Information
            </h1>
          </div>
          <div class="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div class="md:col-span-3 lg:col-span-3 xl:col-span-3 flex flex-col gap-6">
              <AccountComponentsProfile />
            </div>
          </div>
          <div class="flex items-center gap-4">
            <h1 class="font-semibold text-lg md:text-xl">
              Overview
            </h1>
          </div>
          <div>
            <AdminComponentsOverview />
          </div>
          <div class="flex items-center gap-4">
            <h1 class="font-semibold text-lg md:text-xl">
              Orders
            </h1>
          </div>
          <div v-if="ordersPending">
            Loading
          </div>
          <div v-else-if="orders === null || columns === null">
            Error in fetching data
          </div>
          <div v-else>
            <CommonTableDataTable :data="orders" :columns="columns" />
          </div>
        </main>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue'

definePageMeta({
  title: 'Auth',
  description: 'Auth page',
  middleware: ['auth'],
})

const user = useSupabaseUser()

const userName = computed(() => user.value?.user_metadata.full_name ?? user.value?.email.split('@')[0])
</script>

<template>
  <MainLayout>
    <div id="AccountDashboard">
      <div class="flex flex-col min-h-[60vh]">
        <header class="flex h-20 sm:h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <h1 class="text-xl font-bold">
            Welcome back, {{ userName }}!
          </h1>
        </header>
        <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div class="flex items-center gap-4">
            <h1 class="font-semibold text-lg md:text-xl">
              Account Information
            </h1>
          </div>
          <div class="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div class="md:col-span-3 lg:col-span-3 xl:col-span-3 flex flex-col gap-6">
              <AccountComponentsProfile />
              <AccountComponentsAddresses />
            </div>
            <div class="md:col-span-3 lg:col-span-3 xl:col-span-3 flex flex-col gap-6">
              <AccountComponentsOrders />
            </div>
          </div>
        </main>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

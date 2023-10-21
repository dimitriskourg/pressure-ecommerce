<script setup>
const isAccountMenu = ref(false)
</script>

<template>
  <div id="MainLayout" class="w-full fixed z-50">
    <div class="announcementBar w-full bg-black p-3" />
    <div id="TopMenu" class="w-full bg-[#FAFAFA] border-b md:block hidden">
      <ul class="flex items-center justify-end text-xs text-[#333333] font-light px-2 h-10 bg-[#FAFAFA] max-w-1200px">
        <li class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer">
          Home
        </li>
        <li class="border-r border-r-gray-400 px-3 hover:text-[#FF4646] cursor-pointer">
          Help
        </li>
        <li class="relative flex items-center px-2.5 hover:text-[#FF4646] h-full cursor-pointer" :class="isAccountMenu ? 'bg-white border z-40 shadow-md' : 'border border-[#FAFAFA]' " @mouseenter="isAccountMenu = true" @mouseleave="isAccountMenu = false">
          <Icon name="ph:user-thin" size="17" />
          Account
          <Icon name="mdi:chevron-down" size="15" class="ml-5" />

          <div v-if="isAccountMenu" id="AccountMenu" class="absolute bg-white w-[220px] text-[#333333] z-40 top-[38px] -left-[106px] border-x border-b">
            <div v-if="true">
              <div class="font-semibold text-[15px] my-4 px-3">
                Welcome to PRESSURE!
              </div>
              <div class="flex items-center gap-1 px-3 mb-3">
                <NuxtLink to="/auth" class="bg-[#FF4646] text-center w-full text-[16px] rounded-sm text-white font-semibold p-2">
                  <div>Login / Register</div>
                </NuxtLink>
              </div>
            </div>
            <div class="border-b" />
            <ul class="bg-white">
              <li class="text-[13px] py-2 px-4 w-full hover:bg-gray-200" @click="navigateTo('/orders')">
                My Orders
              </li>
              <li v-if="true" class="text-[13px] py-2 px-4 w-full hover:bg-gray-200">
                Sign Out
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <!-- HEADER -->
      <div id="MainHeader" class="flex items-center w-full bg-white">
        <div class="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
          <NuxtLink to="/" class="min-w-[170px]">
            <img src="/PRESSURE-logo.png" alt="" width="170">
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

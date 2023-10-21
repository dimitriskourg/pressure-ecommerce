<script setup>
const isDrawerHidden = ref(true)
const isSearchBarHidden = ref(true)
const searchedValue = ref('')
</script>

<template>
  <div id="MainLayout" class="w-full z-40">
    <div class="announcementBar w-full bg-black p-3" />
    <div class="w-full flex flex-wrap items-center justify-between mx-auto p-2 bg-white border border-b-stone-950/20">
      <div class="hidden md:flex items-center justify-around ml-3">
        <NuxtLink to="/products" class="w-full text-lg mx-2">
          <div>SHOP</div>
        </NuxtLink>
        <NuxtLink to="/contact-us" class="w-full text-lg mx-2 whitespace-nowrap">
          <div>CONTACT US</div>
        </NuxtLink>
      </div>
      <NuxtLink to="/" class="min-w-[170px]">
        <img src="/PRESSURE-logo.png" alt="" width="170">
      </NuxtLink>
      <div class="items-center flex md:hidden">
        <Icon name="ion:search" size="24" class="m-2 md:hidden" @click="isSearchBarHidden = !isSearchBarHidden" />
        <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" @click="isDrawerHidden = !isDrawerHidden; isSearchBarHidden = true">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      <div class="hidden md:block mr-3">
        <NuxtLink to="/auth" class="">
          <Icon name="ph:user-bold" size="30" class="m-2" />
        </NuxtLink>
        <Icon name="ion:search" size="30" class="m-2 hover:cursor-pointer" @click="isSearchBarHidden = !isSearchBarHidden" />
        <NuxtLink to="/cart" class="">
          <Icon name="ph:bag-bold" size="30" class="m-2" />
        </NuxtLink>
      </div>
    </div>

    <!-- Drawer for mobile -->
    <div id="navbar-solid-bg" class="w-full md:hidden md:w-auto border-b-2" :class="isDrawerHidden ? 'hidden' : ''">
      <ul class="flex flex-col font-medium bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
        <li>
          <a href="#" class="block py-4 pl-3 pr-4 border-b">SHOP</a>
        </li>
        <li>
          <a href="#" class="block py-4 pl-3 pr-4 border-b">CONTACT US</a>
        </li>
        <li>
          <a href="#" class="block py-4 pl-3 pr-4 border-b text-sm">Account</a>
        </li>
      </ul>
    </div>

    <!-- search bar -->
    <div class="bg-white border-gray-200 shadow-sm text-md sm:text-lg border-b text-gray-600 hover:text-gray-700" :class="isSearchBarHidden ? 'hidden' : ''">
      <div class="relative px-4">
        <label for="Search" class="sr-only">Search</label>
        <div class="relative flex items-center">
          <input
            id="search12"
            v-model="searchedValue"
            type="text"
            placeholder="SEARCH..."
            class="w-full py-4 pe-10 px-7 outline-none"
          >
          <button type="button" class=" absolute inset-y-0 end-0" @click="searchedValue = ''; isSearchBarHidden = !isSearchBarHidden">
            <Icon name="ph:x-bold" size="20" />
          </button>
          <button type="button" class=" absolute inset-y-0 start-0">
            <Icon name="ion:search" size="20" />
          </button>
        </div>
      </div>
    <!-- end of search bar  -->
    </div>

    <slot />

    <Footer @open-search-bar="isSearchBarHidden = false" />
  </div>
</template>

<style scoped>

</style>

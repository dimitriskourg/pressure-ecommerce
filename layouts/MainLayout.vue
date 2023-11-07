<script setup>
const isDrawerHidden = ref(true)
const isSearchBarHidden = ref(true)
const searchedValue = ref('')
const isSearching = ref(false)
const hasCartItems = ref(false)

function clickedDrawer() {
  isDrawerHidden.value = !isDrawerHidden.value
  isSearchBarHidden.value = true
}
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

      <!-- Mobile Header buttons -->
      <div class="items-center flex md:hidden">
        <button
          class="p-2 hover:bg-gray-200 rounded-lg

"
        >
          <Icon name="ion:search" size="28" class="" @click="isSearchBarHidden = !isSearchBarHidden" />
        </button>
        <button class="p-2 hover:bg-gray-200 rounded-lg" @click="clickedDrawer">
          <Icon name="iconamoon:menu-burger-horizontal-bold" size="28" />
        </button>
        <NuxtLink to="/cart" class="flex items-center p-2 hover:bg-gray-200 rounded-lg relative">
          <Icon name="ph:bag-bold" size="28" class="" />
          <div v-if="hasCartItems" class="absolute top-2 right-1 w-3 h-3 rounded-full bg-gray-800" />
        </NuxtLink>
      </div>

      <!-- Desktop Header buttons -->
      <div class="hidden md:flex items-center ">
        <NuxtLink to="/auth" class="p-2 hover:bg-gray-200 rounded-lg">
          <Icon name="ph:user-bold" size="30" class="" />
        </NuxtLink>
        <button class="p-2 hover:bg-gray-200 rounded-lg">
          <Icon name="ion:search" size="30" @click="isSearchBarHidden = !isSearchBarHidden" />
        </button>
        <NuxtLink to="/cart" class="p-2 hover:bg-gray-200 rounded-lg relative">
          <Icon name="ph:bag-bold" size="30" class="" />
          <!-- bubble over cart to show that cart has items -->
          <div v-if="hasCartItems" class="absolute top-2 right-1 w-3 h-3 rounded-full bg-gray-800" />
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
          <Icon v-if="isSearching" name="eos-icons:loading" size="25" class="mr-5 mt-1" />
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

<script setup>
import { useUserStore } from '~/stores/user'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const userName = computed(() => user.value?.user_metadata.full_name ?? user.value?.email.split('@')[0])
const isEshopAdmin = computed(() => user.value?.role === 'eshop_admin')

const AccountLabel = computed(() => {
  if (user.value)
    return `Welcome, ${userName.value}`
  else
    return 'Account'
})

const userStore = useUserStore()

const isDrawerHidden = ref(true)
const isSearchBarHidden = ref(true)
const searchedValue = ref('')
const isSearching = ref(false)
const hasCartItems = computed(() => userStore.cart.length > 0)
const cartItemsNumber = computed(() => userStore.cart.reduce((acc, product) => acc + product.selectedQuantity, 0))

function clickedDrawer() {
  isDrawerHidden.value = !isDrawerHidden.value
  isSearchBarHidden.value = true
}

watch(searchedValue, (newVal) => {
  if (newVal.length > 0)
    isSearching.value = true

  else
    isSearching.value = false
})

async function onLogOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
    return
  }
  navigateTo('/')
}
</script>

<template>
  <div id="MainLayout" class="w-full z-40">
    <div id="header" class="fixed top-0 z-40 w-full">
      <div v-if="!isEshopAdmin" class="announcementBar w-full bg-black p-4" />
      <div v-else class="announcementBar w-full bg-red-600 text-xs p-2 text-white">
        ADMIN PAGE
      </div>
      <div class="w-full flex flex-wrap items-center justify-between mx-auto p-2 bg-white border border-b-stone-950/20">
        <div class="hidden md:flex items-center justify-around ml-3">
          <NuxtLink to="/products" class="w-full text-lg mx-2">
            <div>SHOP</div>
          </NuxtLink>
          <NuxtLink to="/contact-us" class="w-full text-lg mx-2 whitespace-nowrap">
            <div>CONTACT US</div>
          </NuxtLink>
        </div>
        <NuxtLink to="/" class="min-w-[170px] hover:brightness-90	sm:hover:brightness-100 ">
          <img src="/PRESSURE-logo.png" alt="" width="170" class="rounded-lg">
        </NuxtLink>

        <!-- Mobile Header buttons -->
        <div class="items-center flex md:hidden">
          <button
            class="p-2 hover:bg-gray-200 rounded-lg"
          >
            <Icon name="ion:search" size="28" class="" @click="isSearchBarHidden = !isSearchBarHidden" />
          </button>
          <button class="p-2 hover:bg-gray-200 rounded-lg" @click="clickedDrawer">
            <Icon v-if="isDrawerHidden" name="iconamoon:menu-burger-horizontal-bold" size="28" />
            <Icon v-else name="iconamoon:close-bold" size="28" />
          </button>
          <NuxtLink to="/cart" class="flex items-center p-2 hover:bg-gray-200 rounded-lg relative">
            <Icon name="ph:bag-bold" size="28" class="" />
            <div v-if="hasCartItems" class="absolute top-2 right-1 w-5 h-5 rounded-full bg-cyan-700 text-sm text-white flex items-center justify-center text-center">
              {{ cartItemsNumber }}
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Header buttons -->
        <div class="hidden md:flex items-center ">
          <NuxtLink v-if="!isEshopAdmin" to="/auth/login" class="p-2 hover:bg-gray-200 rounded-lg">
            <Icon name="ph:user-bold" size="30" class="" />
          </NuxtLink>
          <NuxtLink v-else to="/auth/admin" class="p-2 hover:bg-gray-200 rounded-lg">
            <Icon name="ph:user-bold" size="30" class="" />
          </NuxtLink>
          <button class="p-2 hover:bg-gray-200 rounded-lg">
            <Icon name="ion:search" size="30" @click="isSearchBarHidden = !isSearchBarHidden" />
          </button>
          <NuxtLink to="/cart" class="p-2 hover:bg-gray-200 rounded-lg relative">
            <Icon name="ph:bag-bold" size="30" class="" />
            <!-- bubble over cart to show that cart has items -->
            <div v-if="hasCartItems" class="absolute top-2 right-1 w-5 h-5 rounded-full bg-cyan-700 text-sm text-white flex items-center justify-center text-center">
              {{ cartItemsNumber }}
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Drawer for mobile -->
      <div id="navbar-solid-bg" class="w-full md:hidden md:w-auto border-b-2" :class="isDrawerHidden ? 'hidden' : ''">
        <ul v-if="isEshopAdmin" class="flex flex-col font-medium bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
          <li>
            <NuxtLink to="/admin" class="block py-4 pl-3 pr-4 border-b">
              Admin Page
            </NuxtLink>
          </li>
          <li>
            <div class="block py-4 pl-3 pr-4 border-b hover:cursor-pointer" @click="onLogOut">
              Log out
            </div>
          </li>
        </ul>
        <ul v-else class="flex flex-col font-medium bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
          <li>
            <NuxtLink to="/products" class="block py-4 pl-3 pr-4 border-b">
              SHOP
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact-us" class="block py-4 pl-3 pr-4 border-b">
              CONTACT US
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/auth/login" class="block py-4 pl-3 pr-4 border-b text-sm">
              {{ AccountLabel }}
            </NuxtLink>
          </li>
          <li v-if="user">
            <div class="block py-4 pl-3 pr-4 border-b hover:cursor-pointer" @click="onLogOut">
              Log out
            </div>
          </li>
        </ul>
      </div>

      <!-- search bar -->
      <div class="bg-white text-md sm:text-lg rounded-md border text-gray-600 hover:text-gray-700" :class="isSearchBarHidden ? 'hidden' : ''">
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
            <Icon v-if="isSearching" name="eos-icons:loading" size="25" class="mr-8 mt-1" />
            <button type="button" class=" absolute inset-y-0 end-0" @click="searchedValue = ''; isSearchBarHidden = !isSearchBarHidden">
              <Icon name="ph:x-bold" size="20" />
            </button>
            <button type="button" class=" absolute inset-y-0 start-0">
              <Icon name="ion:search" size="20" />
            </button>
          </div>
        </div>
        <SearchBarResults v-if="searchedValue" v-model:is-loading="isSearching" :search-value="searchedValue" />
        <!-- end of search bar  -->
      </div>
    </div>

    <div class="mt-28">
      <slot />
    </div>

    <Footer @open-search-bar="isSearchBarHidden = false" />
  </div>
</template>

<style scoped>

</style>

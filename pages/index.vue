<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const { data: products } = await useFetch('/api/products')
</script>

<template>
  <MainLayout>
    <div id="IndexPage" class="">
      <div class="relative">
        <img src="/cbum.png" alt="C bum sitting" class="w-full min-h-full">
        <NuxtLink to="/products" class="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-3 font-semibold transition duration-500 hover:scale-110 drop-shadow-lg">
          Enter Shop Now
        </NuxtLink>
      </div>
      <div class="mt-4 md:mx-16 px-2">
        <div class="uppercase text-center text-2xl my-12 font-semibold">
          All Products
        </div>
        <CommonLoading v-if="userStore.isLoading" />
        <div v-if="products" class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 mx-5">
          <div v-for="product in products" :key="product">
            <ProductComponent :product="product" />
          </div>
        </div>
        <div class=" my-10  flex justify-center">
          <CommonButtonLink to="/products" class-styles="uppercase rounded-none py-2 px-5 bg-zinc-900 text-white">
            View All Products
          </CommonButtonLink>
        </div>
        <BannersTotalBanners />
      </div>
    </div>
  </MainLayout>
</template>

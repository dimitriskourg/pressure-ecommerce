<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
</script>

<template>
  <MainLayout>
    <div id="IndexPage" class="">
      <div class="relative">
        <img src="/cbum.png" alt="C bum sitting" class="w-full">
        <NuxtLink to="/products" class="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-3 font-semibold transition duration-500 hover:scale-110 drop-shadow-lg">
          Enter Shop Now
        </NuxtLink>
      </div>
      <div class="mt-4 max-w-[1200px] mx-auto px-2">
        Index Page
      </div>
    </div>
  </MainLayout>
</template>

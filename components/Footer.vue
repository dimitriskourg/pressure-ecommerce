<script setup>
defineEmits(['openSearchBar'])
</script>

<template>
  <footer class="text-gray-100 body-font bg-white border-t-2 border-gray-400 mt-4">
    <div class="container px-5 py-24 mx-auto flex  md:flex-row justify-between md:flex-nowrap flex-wrap flex-col">
      <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left mb-14 md:mb-0">
        <div class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <NuxtLink to="/" class="min-w-[170px]">
            <img src="/PRESSURE-logo.png" alt="" width="170">
          </NuxtLink>
        </div>
        <p class="mt-2 text-sm text-gray-500">
          Best site for buying gym equipment
        </p>
      </div>
      <div class="flex-grow flex flex-wrap md:text-left text-center justify-around">
        <div class="">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
            SHOP NOW
          </h2>
          <nav class="list-none mb-10">
            <li class="hover:cursor-pointer text-gray-600 hover:text-gray-800" @click="$emit('openSearchBar')">
              Search
            </li>
            <NuxtLink to="/products" class="text-gray-600 hover:text-gray-800">
              All Products
            </NuxtLink>
            <li>
              <NuxtLink to="/best-sellers" class="text-gray-600 hover:text-gray-800">
                Best Selles
              </NuxtLink>
            </li>
          </nav>
        </div>
        <div class="">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
            HELP
          </h2>
          <nav class="list-none mb-10">
            <li>
              <a class="text-gray-600 hover:text-gray-800">FAQ</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Contact Us</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Terms and Conditions</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Shipping and Returns</a>
            </li>
          </nav>
        </div>
      </div>
    </div>
    <div class="bg-black">
      <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p class="text-white text-sm text-center sm:text-left">
          © 2023 Pressure —
          <a href="https://twitter.com/dimitriskourg" rel="noopener noreferrer" class="text-white ml-1" target="_blank">@dimitriskourg</a>
        </p>
        <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <a class="text-white">
            <Icon name="ion:logo-facebook" size="20" />
          </a>
          <a class="ml-3 text-white">
            <Icon name="ion:logo-twitter" size="20" />
          </a>
          <a class="ml-3 text-white">
            <Icon name="ion:logo-instagram" size="20" />
          </a>
          <a class="ml-3 text-white">
            <Icon name="ion:logo-linkedin" size="20" />
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>

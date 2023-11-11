<script setup>
const { data: categories } = await useFetch('/api/banners')
</script>

<template>
  <div class="grid md:grid-cols-3 grid-cols-1">
    <div v-for="category in categories" :key="category">
      <BannersBannerProduct :category="category" class="m-1" />
    </div>
  </div>
</template>

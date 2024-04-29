<script setup>
const { data: prods, error, pending } = await useFetch('/api/public/products', {
  query: {
    toIndex: 6,
  },
  server: false,
  lazy: true,
})
if (error.value)
  console.error(error.value)
</script>

<template>
  <CommonLoading v-if="pending" />
  <div v-else class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 mx-5">
    <div v-for="product in prods.products" :key="product">
      <ProductComponent :product="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

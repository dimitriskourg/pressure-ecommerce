<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

const { products, loading } = toRefs(props)
</script>

<template>
  <div v-if="loading">
    <CommonLoading :count="6" />
  </div>
  <div v-else class="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 mx-5">
    <div v-for="(product, index) in products" :key="index">
      <ProductComponent :product="product" />
    </div>
    <div v-if="products.length === 0" class="text-center text-lg text-gray-500">
      No products found
    </div>
  </div>
</template>

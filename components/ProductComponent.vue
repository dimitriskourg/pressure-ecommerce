<script setup>
// define product prop
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const { product } = toRefs(props)

console.log(product.value)

const priceComputed = computed(() => {
  const res = (product.value.price / 100) - (product.value.price / 100) * (product.value.discount / 100)
  return res.toFixed(2)
})

const oldPriceComputed = computed(() => {
  return (product.value.price) / 100
})
</script>

<template>
  <div :id="`ProductComponent${product.id}`" class="rounded hover:shadow-md cursor-pointer mx-4 my-3">
    <NuxtLink :to="`/products/${product.id}`" class="relative transition-transform transform hover:grayscale-[60%]">
      <img :src="product.images[0]" :alt="product.title" class="rounded-t">
      <div v-if="product.countInStock === 0" class="absolute left-1 top-1 font-light bg-white/30 py-1 px-3 text-white">
        SOLD-OUT
      </div>
      <div v-if="product.discount" class="absolute right-1 top-1 font-light bg-red-700/80 py-1 px-3 text-white">
        {{ product.discount }}% OFF
      </div>

      <div class="p-2">
        <div class="text-sm text-gray-500">
          {{ product.category }}
        </div>
        <div class="text-lg font-semibold uppercase">
          {{ product.title }}
        </div>
        <div class="text-base text-gray-500 flex justify-center items-center">
          <div v-if="product.discount" class="line-through text-rose-800 mx-1">
            {{ oldPriceComputed }}€
          </div> <div>{{ priceComputed }}€</div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
// define product prop
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const { product } = toRefs(props)

const priceComputed = computed(() => {
  const res = (product.value.price / 100) - (product.value.price / 100) * (product.value.discount / 100)
  return res.toFixed(2)
})

const oldPriceComputed = computed(() => {
  return (product.value.price) / 100
})

const totalStock = computed(() => {
  return product.value.stock.reduce((acc, curr) => acc + curr.quantity, 0)
})
</script>

<template>
  <div :id="`ProductComponent${product.id}`" class="relative rounded hover:shadow-md cursor-pointer m-1 sm:px-1">
    <NuxtLink :to="`/products/${product.id}`" class="transition-transform transform hover:grayscale-[60%]">
      <img :src="product.images[0]" :alt="product.title" class="rounded-t">
      <div v-if="totalStock === 0" class="absolute left-1 top-1 font-light bg-white/30 py-1 px-3 text-white text-sm">
        SOLD-OUT
      </div>
      <div v-if="product.discount" class="absolute right-1 top-1 font-light bg-red-700/80 py-1 px-3 text-white text-sm">
        {{ product.discount }}% OFF
      </div>

      <div class="p-2">
        <div class="text-sm text-gray-500">
          {{ product.category }}
        </div>
        <div class="text-md font-semibold uppercase">
          {{ product.title }}
        </div>
        <div class="text-base text-gray-500 flex justify-start items-center">
          <div v-if="product.discount" class="line-through text-rose-800 mx-1">
            {{ oldPriceComputed }}€
          </div> <div>{{ priceComputed }}€</div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

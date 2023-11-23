<script setup>
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
</script>

<template>
  <div :id="`product-${product.id}-details`" class="my-2">
    <div class="text-xl font-bold uppercase">
      {{ product.title }}
    </div>
    <div class="text-sm font-medium text-gray-500 uppercase">
      {{ product.category }}
    </div>

    <div class="text-sm font-medium text-gray-500 my-2">
      {{ product.color }}
    </div>

    <div class="text-base font-semibold my-3">
      <span v-if="product.discount" class="line-through text-rose-900">
        {{ oldPriceComputed }}€
      </span> <span>{{ priceComputed }}€</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['changeQuantity', 'removeItem'])

const { product } = toRefs(props)

function decreaseQuantity(productUUID, quantity) {
  if (quantity < 1)
    emit('removeItem', productUUID)
  else
    emit('changeQuantity', productUUID, quantity)
}
</script>

<template>
  <li class="flex items-center gap-4">
    <img
      :src="product.images[0]"
      alt=""
      class="h-36 w-36 rounded object-cover"
    >

    <div>
      <NuxtLink :to="`/products/${product.id}`" class="text-sm md:text-base text-gray-900 hover:underline">
        {{ product.title }}
      </NuxtLink>

      <dl class="mt-0.5 space-y-px text-[11px] md:text-sm text-gray-600">
        <div>
          <dt class="inline">
            Size:
          </dt>
          <dd class="inline">
            {{ product.selectedSize }}
          </dd>
        </div>

        <div>
          <dt class="inline">
            Color:
          </dt>
          <dd class="inline">
            {{ product.stock[0].color }}
          </dd>
        </div>
      </dl>
    </div>

    <div class="flex flex-1 items-center justify-end gap-2">
      <label for="Line1Qty" class="sr-only"> Quantity </label>

      <!-- plus and minus buttons -->
      <button
        class="text-gray-600 transition hover:bg-gray-200 rounded p-1 hidden sm:inline"
        @click="decreaseQuantity(product.uuid, product.selectedQuantity - 1)"
      >
        <span class="sr-only">Decrease quantity</span>

        <Icon name="ph:minus-bold" size="20" />
      </button>

      <button
        class="text-gray-600 transition  hover:bg-gray-200 rounded p-1 hidden sm:inline"
        @click="$emit('changeQuantity', product.uuid, product.selectedQuantity + 1)"
      >
        <span class="sr-only">Increase quantity</span>

        <Icon name="ph:plus-bold" size="20" />
      </button>

      <input
        id="Line1Qty"
        type="number"
        min="1"
        :value="product.selectedQuantity"
        class="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        @change="$emit('changeQuantity', product.uuid, parseInt($event.target.value))"
      >

      <button class="text-gray-600 transition hover:text-red-600 rounded p-1 hover:bg-gray-200" @click="$emit('removeItem', product.uuid)">
        <span class="sr-only">Remove item</span>

        <Icon name="ph:trash-simple-bold" size="20" />
      </button>
    </div>
  </li>
</template>

<style lang="scss" scoped>

</style>

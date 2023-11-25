<script setup>
const props = defineProps({
  availableSizes: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['sizeSelected'])

const { availableSizes } = toRefs(props)
const selectedSize = ref(null)

function sizeSelected(size) {
  if (size.quantity === 0)
    return

  emits('sizeSelected', size)
  selectedSize.value = size
}
</script>

<template>
  <div id="product-size-selection" class="my-3">
    <div class="font-semibold text-gray-800 uppercase my-2">
      Select Size
    </div>
    <div class="flex flex-wrap">
      <div v-for="size in availableSizes" :key="size.size" class="mx-1 my-1">
        <div v-if="size.quantity === 0" class="bg-gray-200 text-gray-300 rounded-full w-10 h-10 flex justify-center items-center cursor-not-allowed">
          {{ size.size }}
        </div>

        <div v-else class="bg-gray-200 text-gray-500 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-300" :class="{ 'bg-gray-700 hover:bg-gray-900 text-white': selectedSize === size.size }" @click="sizeSelected(size.size)">
          {{ size.size }}
        </div>
      </div>
    </div>
  </div>
</template>

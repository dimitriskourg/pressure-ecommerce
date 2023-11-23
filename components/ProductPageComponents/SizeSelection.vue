<script setup>
const props = defineProps({
  availableSizes: {
    type: Object,
    required: true,
  },
})

const { availableSizes } = toRefs(props)
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

        <div v-else class="bg-gray-200 text-gray-500 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-300">
          {{ size.size }}
        </div>
      </div>
    </div>
  </div>
</template>

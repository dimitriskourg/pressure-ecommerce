<script setup>
const props = defineProps ({
  count: {
    type: Number,
    required: false,
    default: 3,
  },
  smallLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const gridItems = ref([])
onMounted(() => {
  for (let i = 0; i < props.count; i++)
    gridItems.value.push(i)
})
</script>

<template>
  <div>
    <section class="bg-white">
      <div class="container px-6 mx-auto animate-pulse" :class="{ 'py-2': smallLoading, 'py-10': !smallLoading }">
        <div v-if="!smallLoading" class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(c, index) in gridItems" :key="index" class="w-full ">
            <div class="w-full h-64 bg-gray-300 rounded-lg md:h-72 " />
            <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg " />
            <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg " />
          </div>
        </div>
        <div v-else class="grid grid-cols-1 gap-8 mt-1 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(c, index) in gridItems" :key="index" class="w-full ">
            <div class="w-full h-6 bg-gray-300 rounded-lg md:h-12 " />
            <h1 class="w-40 h-2 mt-4 bg-gray-200 rounded-lg " />
            <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg " />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})

const { category } = toRefs(props)
</script>

<template>
  <NuxtLink :id="`CategoryComponent${category.id}`" :to="`/category/${category.id}`" class="group relative block">
    <div class="relative h-[350px] sm:h-[450px]">
      <img
        :src="category.mainImageUrl"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 rounded"
      >

      <img
        :src="category.secondImageUrl"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 rounded"
      >
    </div>

    <div class="absolute inset-0 flex flex-col items-start justify-end p-6">
      <h3 class="text-xl font-medium text-white text-shadow-lg shadow-indigo-500/50">
        {{ category.category }}
      </h3>

      <span
        class="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {{ category.buttonText }}
      </span>
    </div>
  </NuxtLink>
</template>

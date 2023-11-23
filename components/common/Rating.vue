<script setup>
defineProps({
  rating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="rating">
    <span v-for="n in 5" :key="n">
      <Icon
        name="ic:round-star"
        class="inline-block"
        :class="{
          'text-gray-700': rating >= n,
          'text-gray-300': rating < n,
        }"
      />
    </span>
    <span class="ml-2 text-gray-600 text-sm">({{ numReviews }})</span>
  </div>
</template>

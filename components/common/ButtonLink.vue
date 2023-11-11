<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  classStyles: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<template>
  <NuxtLink :class="props.classStyles" :to="props.to">
    <slot />
  </NuxtLink>
</template>

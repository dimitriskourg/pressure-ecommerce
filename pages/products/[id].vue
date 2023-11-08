<script setup>
import MainLayout from '~/layouts/MainLayout.vue'

const { id } = useRoute().params
</script>

<template>
  <MainLayout>
    <div id="ProductPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      {{ id }}
    </div>
  </MainLayout>
</template>

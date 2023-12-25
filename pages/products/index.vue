<script setup>
import MainLayout from '~/layouts/MainLayout.vue'

function onFiltersChanged(filters) {
  console.log('filters', filters)
}
</script>

<template>
  <MainLayout>
    <div id="ProductsPage" class="mt-4 max-w-[1400px] mx-auto px-8 min-h-[60vh]">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[30%]">
          <ProductsPageComponentsFilters @filters-changed="onFiltersChanged" />
        </div>
        <div class="md:w-[70%]">
          <HomePageProducts />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>

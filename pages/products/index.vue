<script setup>
import MainLayout from '~/layouts/MainLayout.vue'

const sortBy = ref('price_asc')
const categoriesSelected = ref([])
const sizesSelected = ref([])
const colorsSelected = ref([])
const priceRangeSelected = ref('0_100000000')
const currentPage = ref(1)

const fromIndex = computed(() => (currentPage.value - 1) * 12)
const toIndex = computed(() => currentPage.value * 12)

const { data: prods, error, pending } = await useFetch('/api/public/products', {
  query: {
    minQuantity: 0,
    fromIndex,
    toIndex,
    sortBy,
    priceRange: priceRangeSelected,
    categories: categoriesSelected,
    sizes: sizesSelected,
    colors: colorsSelected,
  },
})
if (error.value)
  console.error(error.value)

watch(prods, (newVal) => {
  console.log('Products:', newVal)
})

watch(currentPage, (newVal) => {
  console.log('Current page:', newVal)
})
</script>

<template>
  <MainLayout>
    <div id="ProductsPage" class="mt-4 max-w-[1400px] mx-auto md:px-8 min-h-[60vh]">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[30%] mt-5 px-8 md:px-0">
          <ProductsPageComponentsFilters
            v-model:sort-by="sortBy" v-model:categories-selected="categoriesSelected" v-model:sizes-selected="sizesSelected" v-model:colors-selected="colorsSelected" v-model:price-range-selected="priceRangeSelected"
          />
        </div>
        <div class="md:w-[70%] mt-5">
          <ProductsPageComponentsProducts :products="prods.products" :loading="pending" />
          <ProductsPageComponentsPagination v-model:current-page="currentPage" class="my-10 mx-auto" :total-pages="prods.totalProducts" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>

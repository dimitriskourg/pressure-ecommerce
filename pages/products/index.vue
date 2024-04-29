<script setup>
import MainLayout from '~/layouts/MainLayout.vue'

const route = useRoute()
const isBestSellers = route.query['best-sellers'] === 'true'
const isNewRelease = route.query['new-release'] === 'true'
const isOnSale = route.query['on-sale'] === 'true'

console.log('Best sellers:', isBestSellers, 'New release:', isNewRelease, 'On sale:', isOnSale)

const sortBy = ref('price_asc')
const categoriesSelected = ref([])
const sizesSelected = ref([])
const colorsSelected = ref([])
const priceRangeSelected = ref('0_100000000')
const currentPage = ref(1)

const fromIndex = computed(() => (currentPage.value - 1) * 12)
const toIndex = computed(() => currentPage.value * 12)

const { data: filters, error: filtersError, pending: filtersPending } = await useFetch('/api/public/filters', {
  lazy: false,
})

const { data: prods, error: productsError, pending: productsPending } = await useFetch('/api/public/products', {
  query: {
    minQuantity: 0,
    fromIndex,
    toIndex,
    sortBy,
    priceRange: priceRangeSelected,
    categories: categoriesSelected,
    sizes: sizesSelected,
    colors: colorsSelected,
    bestSellers: isBestSellers,
    newRelease: isNewRelease,
    onSale: isOnSale,
  },
  server: false,
  lazy: true,
})

if (filtersError.value)
  console.error(filtersError.value)

if (productsError.value)
  console.error(productsError.value)

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
      <div v-if="isBestSellers" class="text-center text-3xl pt-3">
        Best sellers
      </div>
      <div v-if="isNewRelease" class="text-center text-3xl pt-3">
        New release
      </div>
      <div v-if="isOnSale" class="text-center text-3xl pt-3">
        On sale
      </div>
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[30%] mt-5 px-8 md:px-0">
          <ProductsPageComponentsFilters
            v-if="!filtersPending" v-model:sort-by="sortBy"
            v-model:categories-selected="categoriesSelected" v-model:sizes-selected="sizesSelected" v-model:colors-selected="colorsSelected" v-model:price-range-selected="priceRangeSelected" :filters="filters"
          />
          <div v-else>
            <CommonLoading :count="1" />
          </div>
        </div>
        <div v-if="!productsPending" class="md:w-[70%] mt-5">
          <ProductsPageComponentsProducts :products="prods.products" :loading="productsPending" />
          <ProductsPageComponentsPagination v-model:current-page="currentPage" class="my-10 mx-auto" :total-pages="prods.totalProducts" />
        </div>
        <div v-else>
          <CommonLoading :count="9" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>

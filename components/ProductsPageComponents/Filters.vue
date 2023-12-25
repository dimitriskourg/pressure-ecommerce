<script setup>
const emit = defineEmits(['filtersChanged'])

const sortByRadios = ref([
  {
    id: 'price_asc',
    value: 'price_asc',
    label: 'Price: Low to High',
  },
  {
    id: 'price_desc',
    value: 'price_desc',
    label: 'Price: High to Low',
  },
  {
    id: 'newest',
    value: 'newest',
    label: 'Newest',
  },
])

const priceRanges = ref([
  {
    id: 'under_10',
    value: 'under_10',
    label: 'Under 10€',
  },
  {
    id: '10_20',
    value: '10_20',
    label: '10€ - 20€',
  },
  {
    id: '20_40',
    value: '20_40',
    label: '20€ - 40€',
  },
  {
    id: '40_60',
    value: '40_60',
    label: '40€ - 60€',
  },
  {
    id: '60_80',
    value: '60_80',
    label: '60€ - 80€',
  },
  {
    id: '80_100',
    value: '80_100',
    label: '80€ - 100€',
  },
  {
    id: 'over_100',
    value: 'over_100',
    label: 'Over 100€',
  },
])

const { data: filters, error } = await useFetch('/api/public/filters')
if (error)
  console.error(error)

const sortBy = ref('price_asc')
const categoriesSelected = ref([])
const sizesSelected = ref([])
const colorsSelected = ref([])
const priceRangeSelected = ref('')

watch([sortBy, categoriesSelected, sizesSelected, colorsSelected, priceRangeSelected], () => {
  const filters = {
    sortBy: sortBy.value,
    categories: categoriesSelected.value,
    sizes: sizesSelected.value,
    colors: colorsSelected.value,
    priceRange: priceRangeSelected.value,
  }
  emit('filtersChanged', filters)
})

function onRemoveFilters() {
  sortBy.value = 'price_asc'
  categoriesSelected.value = []
  sizesSelected.value = []
  colorsSelected.value = []
  priceRangeSelected.value = ''
}
</script>

<template>
  <div id="ProductsFilters">
    <div class="flex justify-between">
      <h3 class="uppercase">
        Filter & Sort
      </h3>
      <div class="">
        <button class="text-base text-gray-500" @click="onRemoveFilters">
          Clear All
        </button>
      </div>
    </div>
    <div id="SortByPicklist" class="mt-2">
      <ProductsPageComponentsFilterDetails title="Sort By" :filter-applied="sortBy !== ''">
        <div class="flex flex-col gap-3">
          <div v-for="radio in sortByRadios" :key="radio.id" class="flex gap-2 items-center">
            <input :id="radio.id" v-model="sortBy" type="radio" :value="radio.value" class=" text-black h-5 w-5 appearance-none rounded-full border border-gray-500 checked:bg-black checked:border-transparent">
            <label :for="radio.id" class="text-gray-500">
              {{ radio.label }}
            </label>
          </div>
        </div>
      </ProductsPageComponentsFilterDetails>

      <div id="CategoriesFilter">
        <ProductsPageComponentsFilterDetails title="Categories" :filter-applied="categoriesSelected.length > 0" border-class="border-b-2">
          <div class="flex flex-col gap-3">
            <div v-for="(category, index) in filters.categories" :key="index" class="flex gap-2 items-center checked:bg-black">
              <input :id="category.category" v-model="categoriesSelected" type="checkbox" class="hidden peer" :value="category.category">
              <label :for="category.category" class="w-full py-3 text-center border-2 border-gray-500 text-gray-500 peer-checked:bg-black peer-checked:text-white peer-checked:border-black">
                {{ category.category }}
              </label>
            </div>
          </div>
        </ProductsPageComponentsFilterDetails>
      </div>

      <div id="sizesFilter">
        <ProductsPageComponentsFilterDetails title="Sizes" :filter-applied="sizesSelected.length > 0" border-class="border-b-2">
          <div class="flex flex-row flex-wrap gap-3">
            <div v-for="(size, index) in filters.sizes" :key="index" class="flex gap-2 items-center">
              <input :id="size.size" v-model="sizesSelected" type="checkbox" class="hidden peer" :value="size.size">
              <label :for="size.size" class="w-20 py-3 text-center border-2 border-gray-500 text-gray-500 peer-checked:bg-black peer-checked:text-white peer-checked:border-black">
                {{ size.size }}
              </label>
            </div>
          </div>
        </ProductsPageComponentsFilterDetails>
      </div>

      <div id="colorsFilter">
        <ProductsPageComponentsFilterDetails title="Colors" :filter-applied="colorsSelected.length > 0" border-class="border-b-2">
          <div class="flex flex-row flex-wrap gap-3">
            <div v-for="(color, index) in filters.colors" :key="index" class="flex gap-2 items-center">
              <input :id="color.color" v-model="colorsSelected" type="checkbox" class="hidden peer" :value="color.color">
              <label :for="color.color" class="w-20 py-3 text-center border-2 border-gray-500 text-gray-500 peer-checked:bg-black peer-checked:text-white peer-checked:border-black">
                {{ color.color }}
              </label>
            </div>
          </div>
        </ProductsPageComponentsFilterDetails>
      </div>

      <div id="priceRangeFilter">
        <ProductsPageComponentsFilterDetails title="Price" :filter-applied="priceRangeSelected !== ''" border-class="border-b-2">
          <div class="flex flex-row flex-wrap gap-3">
            <div v-for="(price, index) in priceRanges" :key="index" class="flex gap-2 items-center">
              <input :id="price.id" v-model="priceRangeSelected" type="radio" class="hidden peer" :value="price.value">
              <label :for="price.id" class="w-44 py-3 text-center border-2 border-gray-500 text-gray-500 peer-checked:bg-black peer-checked:text-white peer-checked:border-black">
                {{ price.label }}
              </label>
            </div>
          </div>
        </ProductsPageComponentsFilterDetails>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

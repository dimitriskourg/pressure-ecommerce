<script setup>
const props = defineProps({
  sortBy: {
    type: String,
    required: true,
  },
  categoriesSelected: {
    type: Array,
    required: true,
  },
  sizesSelected: {
    type: Array,
    required: true,
  },
  colorsSelected: {
    type: Array,
    required: true,
  },
  priceRangeSelected: {
    type: String,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
})
const emits = defineEmits(['update:sortBy', 'update:categoriesSelected', 'update:sizesSelected', 'update:colorsSelected', 'update:priceRangeSelected'])

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
    value: '0_1000',
    label: 'Under 10€',
  },
  {
    id: '10_20',
    value: '1000_2000',
    label: '10€ - 20€',
  },
  {
    id: '20_40',
    value: '20_40',
    label: '20€ - 40€',
  },
  {
    id: '40_80',
    value: '4000_8000',
    label: '40€ - 80€',
  },
  {
    id: 'over_100',
    value: '10000_100000000',
    label: 'Over 100€',
  },
  {
    id: 'all',
    value: '0_100000000',
    label: 'All Prices Range (€)',
  },
])

const isClosed = ref(true)

const sortByValue = ref(props.sortBy)
const categoriesSelectedValue = ref(props.categoriesSelected)
const sizesSelectedValue = ref(props.sizesSelected)
const colorsSelectedValue = ref(props.colorsSelected)
const priceRangeSelectedValue = ref(props.priceRangeSelected)

watch(sortByValue, (newVal) => {
  emits('update:sortBy', newVal)
})
watch(categoriesSelectedValue, (newVal) => {
  emits('update:categoriesSelected', newVal)
})
watch(sizesSelectedValue, (newVal) => {
  emits('update:sizesSelected', newVal)
})
watch(colorsSelectedValue, (newVal) => {
  emits('update:colorsSelected', newVal)
})
watch(priceRangeSelectedValue, (newVal) => {
  emits('update:priceRangeSelected', newVal)
})

function onRemoveFilters() {
  const filters = {
    sortBy: 'price_asc',
    categories: [],
    sizes: [],
    colors: [],
    priceRange: '0_100000000',
  }
  emits('update:sortBy', filters.sortBy)
  emits('update:categoriesSelected', filters.categories)
  emits('update:sizesSelected', filters.sizes)
  emits('update:colorsSelected', filters.colors)
  emits('update:priceRangeSelected', filters.priceRange)
  sortByValue.value = filters.sortBy
  categoriesSelectedValue.value = filters.categories
  sizesSelectedValue.value = filters.sizes
  colorsSelectedValue.value = filters.colors
  priceRangeSelectedValue.value = filters.priceRange
}
</script>

<template>
  <div id="ProductsFilters">
    <div class="flex justify-between">
      <span>
        <span v-if="!isClosed" class="mr-4 inline md:hidden">
          <Icon name="ep:arrow-up-bold" class="text-gray-500" size="24" @click="isClosed = !isClosed" />
        </span>
        <span v-else class="mr-4 inline md:hidden">
          <Icon name="ep:arrow-down-bold" class="text-gray-500" size="24" @click="isClosed = !isClosed" />
        </span>
        <h3 class="uppercase inline">
          Filter & Sort
        </h3>
      </span>
      <div class="">
        <button class="text-base text-gray-500" @click="onRemoveFilters">
          Clear All
        </button>
      </div>
    </div>
    <div id="SortByPicklist" class="mt-2" :class="{ 'hidden md:block': isClosed }">
      <ProductsPageComponentsFilterDetails title="Sort By" :filter-applied="sortByValue !== ''">
        <div class="flex flex-col gap-3">
          <div v-for="radio in sortByRadios" :key="radio.id" class="flex gap-2 items-center">
            <input :id="radio.id" v-model="sortByValue" type="radio" :value="radio.value" class=" text-black h-5 w-5 appearance-none rounded-full border border-gray-500 checked:bg-black checked:border-transparent">
            <label :for="radio.id" class="text-gray-500">
              {{ radio.label }}
            </label>
          </div>
        </div>
      </ProductsPageComponentsFilterDetails>

      <div id="CategoriesFilter">
        <ProductsPageComponentsFilterDetails title="Categories" :filter-applied="categoriesSelectedValue.length > 0" border-class="border-b-2">
          <div v-if="!pending" class="flex flex-col gap-3">
            <div v-for="(category, index) in filters.categories" :key="index" class="flex gap-2 items-center checked:bg-black">
              <input :id="category.category" v-model="categoriesSelectedValue" type="checkbox" class="hidden peer" :value="category.category">
              <label :for="category.category" class="w-full py-3 text-center border-2 border-gray-500 text-gray-500 peer-checked:bg-black peer-checked:text-white peer-checked:border-black">
                {{ category.category }}
              </label>
            </div>
          </div>
        </ProductsPageComponentsFilterDetails>
      </div>

      <div id="sizesFilter">
        <ProductsPageComponentsFilterDetails title="Sizes" :filter-applied="sizesSelectedValue.length > 0" border-class="border-b-2">
          <div class="flex flex-row flex-wrap gap-3">
            <div v-for="(size, index) in filters.sizes" :key="index" class="flex gap-2 items-center">
              <input :id="size.size" v-model="sizesSelectedValue" type="checkbox" class="hidden peer" :value="size.size">
              <label :for="size.size" class="w-20 py-3 text-center border-2 border-gray-500 text-gray-500 peer-checked:bg-black peer-checked:text-white peer-checked:border-black">
                {{ size.size }}
              </label>
            </div>
          </div>
        </ProductsPageComponentsFilterDetails>
      </div>

      <div id="colorsFilter">
        <ProductsPageComponentsFilterDetails title="Colors" :filter-applied="colorsSelectedValue.length > 0" border-class="border-b-2">
          <div class="flex flex-row flex-wrap gap-3">
            <div v-for="(color, index) in filters.colors" :key="index" class="flex gap-2 items-center">
              <input :id="color.color" v-model="colorsSelectedValue" type="checkbox" class="hidden peer" :value="color.color">
              <label :for="color.color" class="w-20 py-3 text-center border-2 border-gray-500 text-gray-500 peer-checked:bg-black peer-checked:text-white peer-checked:border-black">
                {{ color.color }}
              </label>
            </div>
          </div>
        </ProductsPageComponentsFilterDetails>
      </div>

      <div id="priceRangeFilter">
        <ProductsPageComponentsFilterDetails title="Price" :filter-applied="priceRangeSelectedValue !== ''" border-class="border-b-2">
          <div class="flex flex-row flex-wrap gap-3">
            <div v-for="(price, index) in priceRanges" :key="index" class="flex gap-2 items-center">
              <input :id="price.id" v-model="priceRangeSelectedValue" type="radio" class="hidden peer" :value="price.value">
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

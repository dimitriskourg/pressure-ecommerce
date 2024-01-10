<script setup>
import { ScrollArea } from '@/components/ui/scroll-area'

const props = defineProps({
  searchValue: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
    default: true,
  },
})

const emits = defineEmits(['update:isLoading'])

const { searchValue } = toRefs(props)

watch(searchValue, (newVal) => {
  console.log('Search value:', newVal)
})

const { data: prods, error, pending } = await useLazyFetch('/api/public/searchProduct', {
  query: {
    searchPhrase: searchValue,
  },
})
if (error.value)
  console.error(error.value)

const anyProductsResults = computed(() => prods.value?.length === 0)

watch(pending, (newVal) => {
  emits('update:isLoading', newVal)
})

watch(prods, (newVal) => {
  console.log('Products:', newVal)
})
</script>

<template>
  <div id="SearchBarResults">
    <ScrollArea v-if="searchValue" class="h-[200px] w-full rounded-md border p-4">
      <div v-if="pending" class="flex items-center justify-center">
        <CommonLoading :count="3" :small-loading="true" />
      </div>
      <div v-else-if="anyProductsResults" class="flex items-center justify-center">
        <div class="text-lg">
          No results found
        </div>
      </div>
      <div v-else>
        <div>
          <div class="text-lg">
            All results:
          </div>
          <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
            <div v-for="product in prods" :key="product">
              <SmallProductComponent :product="product" />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<style scoped>

</style>

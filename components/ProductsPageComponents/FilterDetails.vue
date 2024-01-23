<script setup>
const props = defineProps({
  borderClass: {
    type: String,
    default: 'border-y-2',
  },
  title: {
    type: String,
    required: true,
  },
  filterApplied: {
    type: Boolean,
    default: false,
  },
})

const { filterApplied } = toRefs(props)
</script>

<template>
  <details class="group [&_summary::-webkit-details-marker]:hidden" :class="borderClass">
    <summary
      class="group flex items-center justify-between  px-2 py-4 my-2 text-gray-700 hover:bg-gray-100 hover:text-gray-800"
    >
      <div class="">
        <span class="font-medium uppercase"> {{ title }} </span>
        <span v-if="filterApplied" class="ml-1 text-xs text-gray-500"> Filter Applied</span>
      </div>

      <span class="shrink-0 transition duration-300 group-open:-rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <div class="px-2 py-3 text-gray-700">
      <slot />
    </div>
  </details>
</template>

<style lang="scss" scoped>

</style>

import { Icon } from '#build/components';
<script setup>
const props = defineProps({
  subTotal: {
    type: String,
    required: true,
  },
  vat: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: false,
    default: '0',
  },
  total: {
    type: String,
    required: true,
  },
  discountApplied: {
    type: String,
    required: false,
    default: '0',
  },
})

const { subTotal, vat, discount, total, discountApplied } = toRefs(props)
</script>

<template>
  <div id="cartDetails" class="mt-8 flex justify-end border-t border-gray-100 pt-8">
    <div class="w-screen max-w-lg space-y-4">
      <dl class="space-y-0.5 text-base text-gray-700">
        <div class="flex justify-between">
          <dt>Subtotal</dt>
          <dd>€{{ subTotal }}</dd>
        </div>

        <div class="flex justify-between">
          <dt>VAT</dt>
          <dd>€{{ vat }}</dd>
        </div>

        <div class="flex justify-between">
          <dt>Discount</dt>
          <dd v-if="discount === '0'">
            0%
          </dd>
          <dd v-else>
            -€{{ discount }}
          </dd>
        </div>

        <div class="flex justify-between !text-base font-medium">
          <dt>Total</dt>
          <dd>€{{ total }}</dd>
        </div>
      </dl>

      <div v-if="discountApplied !== 0" class="flex justify-end">
        <span
          class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
        >
          <Icon name="mdi:coupon-outline" size="18" />

          <p class="whitespace-nowrap text-xs">{{ discountApplied }} Discounts Applied</p>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

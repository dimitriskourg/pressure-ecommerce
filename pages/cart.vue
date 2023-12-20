<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

const vatPercentage = 24

const userStore = useUserStore()
userStore.isLoading = false

console.log('userStore.cart', userStore.cart)

const discountComputed = computed(() => {
  const discount = userStore.cart.reduce((acc, product) => {
    return acc + (product.discount > 0 ? product.price / 100 * product.selectedQuantity * product.discount / 100 : 0)
  }, 0)
  return discount.toFixed(2) ?? '0'
})

const numberOfDiscountedProducts = computed(() => {
  const numberOfDiscountedProducts = userStore.cart.reduce((acc, product) => {
    return acc + (product.discount > 0 ? 1 : 0)
  }, 0)
  return numberOfDiscountedProducts
})

const totalComputed = computed(() => {
  let total = userStore.cart.reduce((acc, product) => {
    return acc + product.price / 100 * product.selectedQuantity
  }, 0)
  total -= discountComputed.value
  return total.toFixed(2)
})

const vatComputed = computed(() => {
  const vat = totalComputed.value / (1 + vatPercentage / 100) * vatPercentage / 100
  return vat.toFixed(2)
})

const subTotalComputed = computed(() => {
  const subTotal = totalComputed.value - vatComputed.value
  return subTotal.toFixed(2)
})

function onChangeQuantity(productUUID, quantity) {
  userStore.changeCartQuantity(productUUID, quantity)
}

function onRemoveItem(productUUID) {
  userStore.removeFromCart(productUUID)
}

async function goToCheckout() {
  // userStore.cart.forEach((product) => {
  //   userStore.addToCheckout(toRaw(product))
  // })
  // return navigateTo('/checkout')
  await useFetch('/api/send')
}
</script>

<template>
  <MainLayout>
    <div id="ShoppingCartPage" class="mx-auto max-w-screen-xl px-4 py-8 min-h-[50vh] sm:px-6 sm:py-12 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <header class="text-center">
          <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">
            Your Cart
          </h1>
        </header>

        <div v-if="userStore.isLoading" class="mt-8 mb-36">
          <div class="flex justify-center">
            <CommonLoading />
          </div>
        </div>

        <div v-else-if="userStore.cart.length === 0" class="mt-8 mb-72">
          <div class="flex justify-center">
            <Icon name="fa-regular:sad-cry" size="64" class="text-gray-800" />
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-500">
              No items in your cart.
            </p>

            <div class="mt-6">
              <NuxtLink
                to="/products"
                class="block rounded bg-gray-900 px-5 py-3 my-28 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Continue Shopping
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="mt-8">
          <ul class="space-y-4">
            <CartComponentsCartItem v-for="product in userStore.cart" :key="product.uuid" :product="product" @change-quantity="onChangeQuantity" @remove-item="onRemoveItem" />
          </ul>

          <CartComponentsCartDetails :sub-total="subTotalComputed" :vat="vatComputed" :discount="discountComputed" :total="totalComputed" :discount-applied="numberOfDiscountedProducts" />

          <div class="flex justify-end my-4" @click="goToCheckout">
            <button class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

function onChangeQuantity(productUUID, quantity) {
  console.log('onChangeQuantity', productUUID, quantity)
  userStore.changeCartQuantity(productUUID, quantity)
}

function onRemoveItem(productUUID) {
  console.log('onRemoveItem', productUUID)
  userStore.removeFromCart(productUUID)
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

        <div v-if="userStore.cart.length === 0" class="mt-8 mb-72">
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

          <CartComponentsCartDetails sub-total="250" vat="25" discount="20" total="200" discount-applied="12" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

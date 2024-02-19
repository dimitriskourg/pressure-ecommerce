<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

userStore.clearCheckout()
userStore.clearCart()
</script>

<template>
  <div>
    <h1>Success</h1>
  </div>
</template>

<style lang="scss" scoped>

</style>

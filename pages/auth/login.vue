<script setup>
import MainLayout from '~/layouts/MainLayout.vue'

definePageMeta({
  title: 'Auth',
  description: 'Auth page',
  middleware: ['auth'],
})
</script>

<template class="">
  <MainLayout class="">
    <div id="Auth" class="flex flex-col gap-2">
      <AuthLogIn />
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

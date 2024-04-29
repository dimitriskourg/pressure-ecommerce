<script setup>
import MainLayout from '~/layouts/MainLayout.vue'

definePageMeta({
  title: 'Auth',
  description: 'Auth page',
  middleware: ['auth'],
})
</script>

<template class="">
  <MainLayout>
    <div id="Auth" class="flex flex-col gap-2 min-h-[60vh] justify-center items-center">
      <AuthLogIn />
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

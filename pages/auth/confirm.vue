<script setup>
import MainLayout from '~/layouts/MainLayout.vue'

const user = useSupabaseUser()
watch(user, () => {
  if (user.value)
    return navigateTo('/addresses')
}, { immediate: true })
</script>

<template>
  <MainLayout>
    <CommonLoading />
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>

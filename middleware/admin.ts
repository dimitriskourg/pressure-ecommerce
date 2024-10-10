export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  const isEshopAdmin = user.value?.role === 'eshop_admin'

  if (to.path === '/auth/login' && user.value && isEshopAdmin)
    return navigateTo('/auth/admin')
  else if (to.path !== '/auth/login' && !user.value)
    return navigateTo('/auth/login')
  else if (to.path === '/auth/admin' && !isEshopAdmin)
    return navigateTo('/auth/login')
})

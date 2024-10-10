export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (to.path === '/auth/login' && user.value)
    return navigateTo('/auth/account')
  else if (to.path !== '/auth/login' && !user.value)
    return navigateTo('/auth/login')
})

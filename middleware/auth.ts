export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  if (to.path === '/auth/login' && user.value)
    return navigateTo('/auth/account')
  else if (to.path !== '/auth/login' && !user.value)
    return navigateTo('/auth/login')
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  pages: true,
  modules: [
    'nuxt-icon',
    'nuxt-lodash',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
  ],
  runtimeConfig: {
    public: {
      // eslint-disable-next-line node/prefer-global/process
      stripePk: process.env.STRIPE_PK_KEY,
      // eslint-disable-next-line node/prefer-global/process
      resentPK: process.env.RESEND_API_KEY,
    },
  },
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  app: {
    head: {
      script: [
        { src: 'https://js.stripe.com/v3/', defer: true },
      ],
    },
  },
  supabase: {
    redirect: false,
  },
})

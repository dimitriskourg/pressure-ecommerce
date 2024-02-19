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
    'shadcn-nuxt',
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  runtimeConfig: {
    // eslint-disable-next-line node/prefer-global/process
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    // eslint-disable-next-line node/prefer-global/process
    ENDPOINT_SECRET: process.env.ENDPOINT_SECRET,
    // eslint-disable-next-line node/prefer-global/process
    resendPK: process.env.RESEND_API_KEY,
    public: {
      // eslint-disable-next-line node/prefer-global/process
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PK_KEY,
      BASE_URL: process.env.BASE_URL,
    },
  },
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  supabase: {
    redirect: false,
  },
})

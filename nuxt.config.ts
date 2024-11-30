// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': { redirect: '/projects' }
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  imports: {
    dirs: [
      '../shared/utils',
      '../shared/validations'
    ]
  },
  nitro: {
    imports: {
      dirs: [
        '../shared/utils',
        '../shared/validations'
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],

  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },


  supabase: {
    redirect: false
  },
})
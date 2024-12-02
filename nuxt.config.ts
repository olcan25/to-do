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
  build: {
    // vue-toastification - old commonjs module 
    transpile: ['vue-toastification'],
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
    'nuxt-svgo-loader',
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
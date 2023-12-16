// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'UDev',
      meta: [
        { name: 'UDev', content: 'Website for web developers. Convert css units.' },
        { name: 'description', content: 'Effortlessly convert CSS units with our online tool. Seamlessly switch between pixels, REM, centimeters, and more. Optimize your web development workflow by quickly transforming measurements to meet your design needs. Try our CSS unit converter now!' }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/robots',
  ],
  robots: {
    UserAgent: '*',
    Disallow: ''
  },
  image: {
    dir: 'assets'
  },
})

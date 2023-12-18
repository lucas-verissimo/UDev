// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Convert px, rem, em, pt, mm, cm',
      meta: [
        { name: 'UDev', content: 'Website for web developers. Convert css units.' },
        { name: 'description', content: 'Effortlessly convert CSS units with our online tool. Seamlessly switch between pixels, REM, EM, cm, mm and pt. Optimize your web development workflow by quickly transforming measurements to meet your design needs. Try our CSS unit converter now!' },
        { name: 'keywords', content: 'pixel pixels rem em centimeters cm millimeter mm pt point' }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  css: ['~/public/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/robots',
    '@vite-pwa/nuxt',
    'nuxt-simple-sitemap',
  ],
  robots: {
    UserAgent: '*',
    Disallow: '/',
    Sitemap: 'https://4udev.vercel.app/sitemap.xml',
  },
  site: {
    url: 'https://4udev.vercel.app',
  },
})

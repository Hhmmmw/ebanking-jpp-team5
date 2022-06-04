import { defineNuxtConfig } from 'nuxt'
import airports from './data/airports'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
// const routes = [
    // { path: '/airport/:code', component: AirportDetail }
//   ]

export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    head: {
        title: 'favorite-airports',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css' }
        ]
    },
    // publicRuntimeConfig: {
    //     axios: {
    //       baseURL: baseUrl,
    //     },
    //   },
      modules: [["@nuxtjs/axios", { proxyHeaders: false }], "@nuxtjs/proxy"],
      components: {
        dirs: [
          '~/components',
        ]
      }
      
      
    //,
    // modules: [
    //     '@nuxtjs/axios',
    // ],
    // axios: {
    //     proxy: true
    // }
})

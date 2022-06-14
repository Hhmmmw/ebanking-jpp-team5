// import fs from 'fs'
// import webpack from 'webpack'

// const fs = __non_webpack_require__("fs")

// const filesystem = require("fs")

// const logOptions = {
//   // optional : defaults to true if not specified
//   isEnabled: true,
//   // required ['debug', 'info', 'warn', 'error', 'fatal']
//   logLevel: 'debug',
//   // optional : defaults to false if not specified
//   stringifyArguments: false,
//   // optional : defaults to false if not specified
//   showLogLevel: false,
//   // optional : defaults to false if not specified
//   showMethodName: false,
//   // optional : defaults to '|' if not specified
//   separator: '|',
//   // optional : defaults to false if not specified
//   showConsoleColors: false
// }

const config = {
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  dev: process.env.NODE_ENV !== 'production',
  // dir: new fs.Dir('../'),
  node: {
    fs: 'empty'
  },
  serverMiddleware: {
  '/api': '~/api'
  },
  // server middleware
  // serverMiddleware:
  // process.env.NODE_ENV === 'production' ? [] : ['~/api/hello.js'],
  // { path: '/log', handler: '~/api/log.js' }

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ebanking',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/helpers' },
    // { src: '~/plugins/myPlugin' },
    // { src: '~/plugins/axios.js' }
    // { src: '~/plugins/logger.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://localhost:4001/api',
    }
  },

  modules: [
    '@nuxtjs/axios'
    // '@nuxtjs/auth-next'
    // ['nuxt-log', logOptions]

    // 'nuxt-logger'
  ],
  axios: {
    baseURL: 'http://localhost:4001/api',
    browserBaseURL: 'http://localhost:4001'
  },

  // auth
  // auth: {
  // Options
  // },
  /// logger
  // logger: {
  //   isEnabled: true, // true or false, defaults to true
  //   logLevel: 'debug' // debug, info, warn or error, defaults to debug
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    target: 'node',
    node: {
      fs: 'empty'
    },
    plugins: [
      // new webpack.ProvidePlugin({
      //   // global modules
      //   // $: 'jquery',
      //   // _: 'lodash'
      //   target: 'node',
      //   node: {
      //     fs: 'empty'
      //   }
      // })
    ]
  }
}

const logger = (title, array, open = [1, 1, 1]) => {
  if (open[0] === 1) { console.group(title) }
  if (open[1] === 1) {
    array.forEach((e) => {
      console.info(title, e)
    })
  }
  if (open[2] === 1) { console.groupEnd() }
}
module.exports = { config, logger }

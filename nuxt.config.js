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

export default {

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
  modules: [
    // '@nuxtjs/axios',
    // '@nuxtjs/auth-next'
    // ['nuxt-log', logOptions]

    // 'nuxt-logger'
  ]
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
  // build: {
  // }
}

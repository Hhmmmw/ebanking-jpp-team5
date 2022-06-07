import axios from 'axios'

export default (context, inject) => {
  const logGatewayCall = (level, message) => {
    try {
      // for demo only - use base URLs from env instead;
      axios.post(
        process.client
          ? 'http://localhost:3000/log'
          : 'http://127.0.0.1:3000/log',
        { message, level }
      )
    } catch (error) {
      // do nothing since your logger had to be the only one :)
    }
  }

  // entrypoint for logging - for both SSR and CSR
  const logger = {
    warn: message => logGatewayCall('warn', message),
    info: message => logGatewayCall('info', message),
    error: message => logGatewayCall('error', message)
  }

  // what about capturing the console.error calls and use the custom logger globally?
  const error = (...message) => logger.error(JSON.stringify(message))
  if (!context.isDev) { console.error = error }

  // Inject $hello(msg) in Vue, context and store.
  inject('log', logger)
  // For Nuxt <= 2.12, also add
  context.$log = logger
}

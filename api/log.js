export default function(req, res) {
  // configure the logger, set the driver to previously installed "@log4js-node/logstashudp"
  configure({
    appenders: {
      logstash: {
        type: '@log4js-node/logstashudp', // UDP "driver"
        host: 'localhost', // for demo only; use value from env instead
        port: 5000 // for demo only; use value from env instead
      }
    },
    categories: {
      default: { appenders: ['logstash'], level: 'info' }
    }
  })
  const logger = getLogger() // get the logger instance
  req.on('data', data => {
    // parse the request payload from the nuxt plugin and push it forward to the log4js configured appender
    const { level, message } = JSON.parse(data)
    switch (level) {
      case 'warn':
        return logger.warn(message)
      case 'info':
        return logger.info(message)
      case 'error':
        return logger.error(message)
    }
  })

  res.end()
}


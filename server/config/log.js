const { IS_LOGGING } = process.env

// exports.
const log = (x) => {
  if (IS_LOGGING) {
    console.log(x)
  }
}
// exports.
const cerr = (x) => {
  if (IS_LOGGING) {
    console.error(x)
  }
}
// exports.
const exit = (x) => {
  if (IS_LOGGING) {
    console.exit(x)
  }
}
// exports.
const info = (x) => {
  if (IS_LOGGING) {
    console.info(x)
  }
}
// exports.
const warn = (x) => {
  if (IS_LOGGING) {
    console.warn(x)
  }
}
// exports.
const debug = (x) => {
  if (IS_LOGGING) {
    console.debug(x)
  }
}
// exports.
const group = (x) => {
  if (IS_LOGGING) {
    console.group(x)
  }
}
// exports.
const groupEnd = (x) => {
  if (IS_LOGGING) {
    console.groupEnd(x)
  }
}

exports.module = { log, exit, cerr, info, warn, debug, group, groupEnd }

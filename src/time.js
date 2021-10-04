const isFunction = require("./is-function.js")

function timeSync(fn, args) {
  assert(isFunction(fn), "`fn` must be a function!")

  const start = new Date()

  if (args) {
    fn(...args)
  } else {
    fn()
  }

  return new Date() - start
}

async function timeAsync(fn, args) {
  assert(isFunction(fn), "`fn` must be a function!")

  const start = new Date()

  if (args) {
    await fn(...args)
  } else {
    await fn()
  }

  return new Date() - start
}

module.exports = { timeSync, timeAsync }

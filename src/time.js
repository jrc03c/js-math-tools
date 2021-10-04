function timeSync(fn, args) {
  const start = new Date()

  if (args) {
    fn(...args)
  } else {
    fn()
  }

  return new Date() - start
}

async function timeAsync(fn, args) {
  const start = new Date()

  if (args) {
    await fn(...args)
  } else {
    await fn()
  }

  return new Date() - start
}

module.exports = { timeSync, timeAsync }

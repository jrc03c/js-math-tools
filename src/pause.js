function pause(ms) {
  return new Promise((resolve, reject) => {
    try {
      return setTimeout(resolve, ms)
    } catch (e) {
      return reject(e)
    }
  })
}

module.exports = pause

const isBrowser = new Function(`
  try {
    return this === window
  } catch(e) {}

  try {
    return typeof importScripts !== "undefined"
  } catch(e) {}

  return false
`)

class MathError extends Error {
  constructor(message) {
    // browser
    if (isBrowser()) {
      super(message)
    }

    // node
    else {
      super("\n\n\x1b[31m" + message + "\n\x1b[0m")
    }
  }
}

module.exports = MathError

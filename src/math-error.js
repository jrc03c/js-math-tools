class MathError extends Error {
  constructor(message) {
    // browser
    if (typeof window !== "undefined") {
      super(message)
    }

    // node
    else {
      super("\n\n\x1b[31m" + message + "\n\x1b[0m")
    }
  }
}

module.exports = MathError

const indexOf = require("./index-of.js")
const max = require("./max.js")

function argmax(x) {
  try {
    const out = indexOf(x, max(x))

    if (out) {
      if (out.length === 0) {
        return null
      } else if (out.length === 1) {
        return out[0]
      } else {
        return out
      }
    } else {
      return null
    }
  } catch (e) {
    return NaN
  }
}

module.exports = argmax

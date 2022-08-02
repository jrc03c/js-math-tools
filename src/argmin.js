const indexOf = require("./index-of.js")
const min = require("./min.js")

function argmin(x) {
  try {
    const out = indexOf(x, min(x))

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

module.exports = argmin

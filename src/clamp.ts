const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function clamp(x, a, b) {
  try {
    if (!isNumber(x)) return NaN
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN

    if (x < a) return a
    if (x > b) return b
    return x
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(clamp)

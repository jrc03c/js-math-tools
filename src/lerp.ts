const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function lerp(a, b, f) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    if (!isNumber(f)) return NaN

    return f * (b - a) + a
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(lerp)

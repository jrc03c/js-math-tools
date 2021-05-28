const vectorize = require("./vectorize.js")
const isNumber = require("./is-number.js")

function pow(x, p) {
  try {
    if (!isNumber(x)) return NaN
    if (!isNumber(p)) return NaN
    return Math.pow(x, p)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(pow)

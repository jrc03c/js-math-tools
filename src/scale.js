const vectorize = require("./vectorize.js")
const isNumber = require("./is-number.js")

function scale(a, b) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    return a * b
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(scale)

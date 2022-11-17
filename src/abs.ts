const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function abs(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.abs(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(abs)

const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function abs(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.abs(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(abs)

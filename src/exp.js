const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function exp(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.exp(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(exp)

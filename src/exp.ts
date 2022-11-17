const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function exp(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.exp(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(exp)

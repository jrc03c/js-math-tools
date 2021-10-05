const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function sqrt(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.sqrt(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sqrt)

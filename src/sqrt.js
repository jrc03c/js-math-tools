const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function sqrt(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.sqrt(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sqrt)

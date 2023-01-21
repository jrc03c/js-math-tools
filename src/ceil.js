const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function ceil(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.ceil(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(ceil)

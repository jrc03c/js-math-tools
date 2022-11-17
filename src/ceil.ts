const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function ceil(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.ceil(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(ceil)

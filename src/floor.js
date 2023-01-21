const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function floor(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.floor(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(floor)

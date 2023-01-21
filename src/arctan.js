const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function arctan(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.atan(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(arctan)

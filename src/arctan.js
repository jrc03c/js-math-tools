const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function arctan(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.atan(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(arctan)

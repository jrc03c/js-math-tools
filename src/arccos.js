const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function arccos(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.acos(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(arccos)

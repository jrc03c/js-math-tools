const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function arccos(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.acos(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(arccos)

const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function floor(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.floor(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(floor)

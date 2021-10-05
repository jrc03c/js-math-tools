const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function round(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.round(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(round)

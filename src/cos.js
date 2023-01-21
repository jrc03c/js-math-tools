const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function cos(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.cos(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(cos)

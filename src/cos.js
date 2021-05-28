const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function cos(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.cos(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(cos)

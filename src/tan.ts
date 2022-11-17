const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function tan(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.tan(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(tan)

const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function tan(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.tan(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(tan)

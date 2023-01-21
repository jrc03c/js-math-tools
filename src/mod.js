const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function mod(a, b) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    return a % b
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(mod)

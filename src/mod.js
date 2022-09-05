const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

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

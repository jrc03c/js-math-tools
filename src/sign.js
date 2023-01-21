const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function sign(x) {
  try {
    if (!isNumber(x)) return NaN
    if (x < 0) return -1
    if (x > 0) return 1
    return 0
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sign)

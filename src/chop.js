const isUndefined = require("./is-undefined.js")
const abs = require("./abs.js")
const vectorize = require("./vectorize.js")
const isNumber = require("./is-number.js")

function chop(x, threshold) {
  try {
    if (!isNumber(x)) return NaN

    if (isUndefined(threshold)) {
      threshold = 1e-10
    } else if (!isNumber(threshold)) {
      return NaN
    }

    return abs(x) < threshold ? 0 : x
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(chop)

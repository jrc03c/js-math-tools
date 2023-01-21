const isNumber = require("./is-number")
const isUndefined = require("./is-undefined")
const vectorize = require("./vectorize")

function log(x, base) {
  try {
    base = isUndefined(base) ? Math.E : base
    if (!isNumber(x)) return NaN
    if (!isNumber(base)) return NaN
    return Math.log(x) / Math.log(base)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(log)

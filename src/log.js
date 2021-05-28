const isNumber = require("./is-number.js")
const isUndefined = require("./is-undefined.js")
const vectorize = require("./vectorize.js")

const log = vectorize(function (x, base) {
  try {
    base = isUndefined(base) ? Math.E : base
    if (!isNumber(x)) return NaN
    if (!isNumber(base)) return NaN
    return Math.log(x) / Math.log(base)
  } catch (e) {
    return NaN
  }
})

module.exports = log

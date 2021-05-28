let isUndefined = require("./is-undefined.js")
let abs = require("./abs.js")
let vectorize = require("./vectorize.js")

let chop = vectorize(function (x, threshold) {
  try {
    if (isNaN(x)) return NaN
    if (!!threshold && isNaN(threshold)) return NaN
    threshold = isUndefined(threshold) || isNaN(threshold) ? 1e-10 : threshold
    return abs(x) < threshold ? 0 : x
  } catch (e) {
    return NaN
  }
})

module.exports = chop

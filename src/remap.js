const isArray = require("./is-array")
const isNumber = require("./is-number")
const isUndefined = require("./is-undefined")
const max = require("./max")
const min = require("./min")
const vectorize = require("./vectorize")

const helper = vectorize(function (x, a, b, c, d) {
  try {
    if (![x, a, b, c, d].every(v => isNumber(v))) {
      return NaN
    }

    if (b - a === 0) return NaN

    return ((d - c) * (x - a)) / (b - a) + c
  } catch (e) {
    return NaN
  }
})

function remap(x, a, b, c, d) {
  if (isArray(x) && isUndefined(c) && isUndefined(d)) {
    c = a
    d = b
    a = min(x)
    b = max(x)
  }

  return helper(x, a, b, c, d)
}

module.exports = remap

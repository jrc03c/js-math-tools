const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function map(x, a, b, c, d) {
  try {
    if (!isNumber(x)) return NaN
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    if (!isNumber(c)) return NaN
    if (!isNumber(d)) return NaN

    return ((d - c) * (x - a)) / (b - a) + c
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(map)

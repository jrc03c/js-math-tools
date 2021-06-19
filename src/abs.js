const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

const abs = vectorize(function (x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.abs(x)
  } catch (e) {
    return NaN
  }
})

module.exports = abs

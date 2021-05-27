const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function sin(x) {
  try {
    if (!isNumber(x)) return NaN
    return Math.sin(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sin)

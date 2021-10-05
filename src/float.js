const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function float(x) {
  try {
    const out = JSON.parse(x)
    if (isNumber(out)) return out
    return NaN
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(float)

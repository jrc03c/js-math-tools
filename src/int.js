const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function int(x) {
  try {
    const out = JSON.parse(x)
    if (isNumber(out)) return parseInt(out)
    return NaN
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(int)

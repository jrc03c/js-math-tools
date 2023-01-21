const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function float(x) {
  try {
    if (x === "Infinity") {
      return Infinity
    }

    if (x === "-Infinity") {
      return -Infinity
    }

    const out = JSON.parse(x)
    if (isNumber(out)) return out
    return NaN
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(float)

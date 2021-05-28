const vectorize = require("./vectorize.js")

function floor(x) {
  try {
    if (typeof x !== "number") return NaN
    return Math.floor(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(floor)

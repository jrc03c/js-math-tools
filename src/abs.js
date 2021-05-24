const vectorize = require("./vectorize.js")

const abs = vectorize(function (x) {
  try {
    if (typeof x === "boolean") return NaN
    return Math.abs(x)
  } catch (e) {
    return NaN
  }
})

module.exports = abs

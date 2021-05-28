const vectorize = require("./vectorize.js")

const clamp = vectorize(function (x, a, b) {
  try {
    if (isNaN(x)) return NaN
    if (isNaN(a)) return NaN
    if (isNaN(b)) return NaN

    if (x < a) return a
    if (x > b) return b
    return x
  } catch (e) {
    return NaN
  }
})

module.exports = clamp

const vectorize = require("./vectorize.js")

const arcsin = vectorize(function (x) {
  try {
    return Math.asin(x)
  } catch (e) {
    return NaN
  }
})

module.exports = arcsin

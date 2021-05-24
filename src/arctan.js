const vectorize = require("./vectorize.js")

const arctan = vectorize(function (x) {
  try {
    return Math.atan(x)
  } catch (e) {
    return NaN
  }
})

module.exports = arctan

const vectorize = require("./vectorize.js")

const arccos = vectorize(function (x) {
  try {
    return Math.acos(x)
  } catch (e) {
    return NaN
  }
})

module.exports = arccos

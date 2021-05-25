const vectorize = require("./vectorize.js")

const cos = vectorize(function (x) {
  try {
    return Math.cos(x)
  } catch (e) {
    return NaN
  }
})

module.exports = cos

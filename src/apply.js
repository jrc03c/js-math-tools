const vectorize = require("./vectorize.js")

const apply = vectorize(function (x, fn) {
  try {
    return fn(x)
  } catch (e) {
    return NaN
  }
})

module.exports = apply

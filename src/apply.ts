const vectorize = require("./vectorize.js")

function apply(x, fn) {
  try {
    return fn(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(apply)

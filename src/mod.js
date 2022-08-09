const vectorize = require("./vectorize.js")

function mod(a, b) {
  try {
    return a % b
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(mod)

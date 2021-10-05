const sqrt = require("./sqrt.js")
const variance = require("./variance.js")

function std(arr) {
  try {
    return sqrt(variance(arr))
  } catch (e) {
    return NaN
  }
}

module.exports = std

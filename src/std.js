const variance = require("./variance.js")

function std(arr) {
  try {
    return Math.sqrt(variance(arr))
  } catch (e) {
    return NaN
  }
}

module.exports = std

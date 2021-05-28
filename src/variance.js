const pow = require("./pow.js")
const std = require("./std.js")

function variance(arr) {
  try {
    return pow(std(arr), 2)
  } catch (e) {
    return NaN
  }
}

module.exports = variance

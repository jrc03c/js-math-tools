const pow = require("./pow.js")
const sqrt = require("./sqrt.js")
const subtract = require("./subtract.js")
const sum = require("./sum.js")

function distance(a, b) {
  try {
    return sqrt(sum(pow(subtract(a, b), 2)))
  } catch (e) {
    return NaN
  }
}

module.exports = distance

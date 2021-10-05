const flatten = require("./flatten.js")
const multiply = require("./multiply.js")

function product(arr) {
  try {
    return multiply(...flatten(arr))
  } catch (e) {
    return NaN
  }
}

module.exports = product

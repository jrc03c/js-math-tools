const isNumber = require("../is-number.js")

function isInteger(x) {
  return isNumber(x) && parseInt(x) === x
}

function isWholeNumber(x) {
  return isInteger(x) && x >= 0
}

module.exports = isWholeNumber

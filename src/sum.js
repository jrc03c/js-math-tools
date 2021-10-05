const add = require("./add.js")
const flatten = require("./flatten.js")

function sum(arr) {
  try {
    return add(...flatten(arr))
  } catch (e) {
    return NaN
  }
}

module.exports = sum

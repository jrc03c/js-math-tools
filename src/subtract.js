const add = require("./add.js")
const scale = require("./scale.js")

function subtract(a, b) {
  return add(a, scale(b, -1))
}

module.exports = subtract

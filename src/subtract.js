const add = require("./add")
const scale = require("./scale")

function subtract(a, b) {
  return add(a, scale(b, -1))
}

module.exports = subtract

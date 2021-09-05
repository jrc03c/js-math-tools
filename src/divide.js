const scale = require("./scale.js")
const pow = require("./pow.js")

function divide(a, b) {
  return scale(a, pow(b, -1))
}

module.exports = divide

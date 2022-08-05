const pow = require("./pow.js")
const scale = require("./scale.js")

function divide(a, b) {
  return scale(a, pow(b, -1))
}

module.exports = divide

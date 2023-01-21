const pow = require("./pow")
const scale = require("./scale")

function divide(a, b) {
  return scale(a, pow(b, -1))
}

module.exports = divide

const multiply = require("./multiply.js")

function scale() {
  return multiply(...arguments)
}

module.exports = scale

const multiply = require("./multiply")

function scale() {
  return multiply(...arguments)
}

module.exports = scale

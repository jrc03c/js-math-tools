const apply = require("./apply")
const ndarray = require("./ndarray")

function ones(shape) {
  return apply(ndarray(shape), () => 1)
}

module.exports = ones

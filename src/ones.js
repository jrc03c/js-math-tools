const apply = require("./apply.js")
const ndarray = require("./ndarray.js")

function ones(shape) {
  return apply(ndarray(shape), () => 1)
}

module.exports = ones

const ndarray = require("./ndarray.js")
const apply = require("./apply.js")

function ones(shape) {
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

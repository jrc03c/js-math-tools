const ndarray = require("./ndarray.js")
const apply = require("./apply.js")

function zeros(shape) {
  return apply(ndarray(shape), v => 0)
}

module.exports = zeros

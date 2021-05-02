let ndarray = require("./ndarray.js")
let apply = require("./apply.js")

function zeros(shape){
  return apply(ndarray(shape), x => 0)
}

module.exports = zeros

let ndarray = require("./ndarray.js")

function ones(shape){
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

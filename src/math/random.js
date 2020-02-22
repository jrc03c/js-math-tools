let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function random(shape){
  if (!shape) return Math.random()
  return apply(ndarray(shape), Math.random)
}

module.exports = random

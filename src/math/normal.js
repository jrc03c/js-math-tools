let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function normal(shape){
  function n(){
    let u1 = Math.random()
    let u2 = Math.random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  return apply(ndarray(shape), n)
}

module.exports = normal

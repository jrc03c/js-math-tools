let isArray = require("./is-array.js")
let range = require("./range.js")

function ndarray(shape){
  if (!isArray(shape)) shape = [shape]

  if (shape.length === 1){
    return range(0, shape[0]).map(v => 0)
  } else {
    let out = []
    for (let i=0; i<shape[0]; i++) out.push(ndarray(shape.slice(1, shape.length)))
    return out
  }
}

module.exports = ndarray

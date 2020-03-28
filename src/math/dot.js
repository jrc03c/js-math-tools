let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isEqual = require("./is-equal.js")
let flatten = require("./flatten.js")
let shape = require("./shape.js")
let sum = require("./sum.js")
let scale = require("./scale.js")
let transpose = require("./transpose.js")

function dot(a, b){
  assert(!isUndefined(a) && !isUndefined(b), "You must pass two arrays of numbers into the `dot` function!")
  assert(isArray(a) && isArray(b), "You must pass two arrays of numbers into the `dot` function!")

  flatten(a).concat(flatten(b)).forEach(function(val){
    assert(isNumber(val), "The `dot` function only works on numbers!")
  })

  let aShape = shape(a)
  let bShape = shape(b)

  assert(aShape.length <= 2 && bShape.length <= 2, "I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!")
  assert(aShape[aShape.length-1] === bShape[0], `There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${aShape[aShape.length-1]} !== ${bShape[0]})`)

  if (aShape.length === 1 && bShape.length === 1){
    return sum(scale(a, b))
  } else if (aShape.length === 1 && bShape.length === 2){
    return transpose(b).map(col => dot(a, col))
  } else if (aShape.length === 2 && bShape.length === 1){
    return a.map(row => dot(row, b))
  } else if (aShape.length === 2 && bShape.length === 2){
    let bTranspose = transpose(b)
    let out = []

    for (let i=0; i<a.length; i++){
      let row = []

      for (let j=0; j<bTranspose.length; j++){
        row.push(dot(a[i], bTranspose[j]))
      }

      out.push(row)
    }

    return out
  }
}

module.exports = dot

// tests
if (!module.parent){
  console.log("All tests passed!")
}

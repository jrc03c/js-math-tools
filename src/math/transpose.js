let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let shape = require("./shape.js")
let reverse = require("./reverse.js")
let ndarray = require("./ndarray.js")

function transpose(arr){
  assert(!isUndefined(arr), "You must pass an array into the `transpose` function!")
  assert(isArray(arr), "You must pass an array into the `transpose` function!")

  let theShape = shape(arr)
  assert(theShape.length <= 2, "I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!")

  if (theShape.length === 1){
    return reverse(arr)
  } else if (theShape.length === 2){
    let out = ndarray(reverse(theShape))

    for (let row=0; row<theShape[0]; row++){
      for (let col=0; col<theShape[1]; col++){
        out[col][row] = arr[row][col]
      }
    }

    return out
  }
}

module.exports = transpose

// tests
if (!module.parent && typeof(window) === "undefined"){
  let isEqual = require("./is-equal.js")

  let x = [2, 3, 4]
  let yTrue = [4, 3, 2]
  let yPred = transpose(x)
  assert(isEqual(yTrue, yPred), `transpose([2, 3, 4]) should be [4, 3, 2]!`)

  x = [[2, 3, 4], [5, 6, 7], [8, 9, 10]]
  yTrue = [[2, 5, 8], [3, 6, 9], [4, 7, 10]]
  yPred = transpose(x)
  assert(isEqual(yTrue, yPred), `transpose([[2, 3, 4], [5, 6, 7], [8, 9, 10]]) should be [[2, 5, 8], [3, 6, 9], [4, 7, 10]]!`)

  x = [["a", "b", "c", "d"], ["e", "f", "g", "h"]]
  yTrue = [["a", "e"], ["b", "f"], ["c", "g"], ["d", "h"]]
  yPred = transpose(x)
  assert(isEqual(yTrue, yPred), `transpose([["a", "b", "c", "d"], ["e", "f", "g", "h"]]) should be [["a", "e"], ["b", "f"], ["c", "g"], ["d", "h"]]!`)

  let hasFailed

  try {
    hasFailed = false
    transpose()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose() should have failed!`)

  try {
    hasFailed = false
    transpose([[2, 3, 4], [5, 6]])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose([[2, 3, 4], [5, 6]]) should have failed!`)

  try {
    hasFailed = false
    transpose({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose({}) should have failed!`)

  try {
    hasFailed = false
    transpose(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose(() => {}) should have failed!`)

  try {
    hasFailed = false
    transpose("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose("foo") should have failed!`)

  try {
    hasFailed = false
    transpose(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose(234) should have failed!`)

  try {
    hasFailed = false
    transpose(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose(true) should have failed!`)

  try {
    hasFailed = false
    transpose(ndarray([2, 3, 4]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `transpose() should have failed!`)

  console.log("All tests passed!")
}

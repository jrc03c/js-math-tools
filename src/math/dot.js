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
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")

  let a = [2, 3, 4]
  let b = [5, 6, 7]
  let yTrue = 56
  let yPred = dot(a, b)
  assert(isEqual(yTrue, yPred), `dot([2, 3, 4], [5, 6, 7]) should be 56!`)

  a = [[2, 3], [4, 5], [6, 7]]
  b = [[8, 9, 10], [11, 12, 13]]
  yTrue = [[49, 54, 59], [87, 96, 105], [125, 138, 151]]
  yPred = dot(a, b)
  assert(isEqual(yTrue, yPred), `dot([[2, 3], [4, 5], [6, 7]], [[8, 9, 10], [11, 12, 13]]) should be [[49, 54, 59], [87, 96, 105], [125, 138, 151]]!`)

  a = [4, 3, 2, 1]
  b = [[12, 11], [10, 9], [8, 7], [6, 5]]
  yTrue = [100, 90]
  yPred = dot(a, b)
  assert(isEqual(yTrue, yPred), `dot([4, 3, 2, 1], [[12, 11], [10, 9], [8, 7], [6, 5]]) should be [100, 90]!`)

  a = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]
  b = [11, 12, 13, 14, 15]
  yTrue = [205, 530]
  yPred = dot(a, b)
  assert(isEqual(yTrue, yPred), `dot([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], [11, 12, 13, 14, 15]) should be [100, 90]!`)

  let hasFailed

  try {
    hasFailed = false
    dot()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot() should have failed!`)

  try {
    hasFailed = false
    dot(2, 3)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(2, 3) should have failed!`)

  try {
    hasFailed = false
    dot(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(true, false) should have failed!`)

  try {
    hasFailed = false
    dot("foo", "bar")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot("foo", "bar") should have failed!`)

  try {
    hasFailed = false
    dot(normal([2, 3]), normal([2, 3]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(normal([2, 3]), normal([2, 3])) should have failed!`)

  try {
    hasFailed = false
    dot(normal([2, 3, 4]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot([2, 3, 4]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    dot(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    dot(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot(foo, foo) should have failed!`)

  try {
    hasFailed = false
    dot({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `dot({}, {}) should have failed!`)

  console.log("All tests passed!")
}

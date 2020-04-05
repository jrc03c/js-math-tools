let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let isArray = require("./is-array.js")
let range = require("./range.js")
let flatten = require("./flatten.js")
let shape = require("./shape.js")
let floor = require("./floor.js")

function slice(arr, indices){
  assert(!isUndefined(arr), "You must pass an array into the `slice` function!")
  assert(isArray(arr), "You must pass an array into the `slice` function!")

  if (isUndefined(indices)) return arr.slice()

  assert(isArray(indices), "The indices passed into the `slice` function must be a one-dimensional array of integers or null values.")

  flatten(indices).forEach(function(idx){
    assert(isUndefined(idx) || (isNumber(idx) && floor(idx) === idx), "The indices passed into the `slice` function must be a one-dimensional array of integers or null values.")
  })

  let idx = indices[0]
  if (isUndefined(idx)) idx = range(0, arr.length)
  if (isNumber(idx)) idx = [idx]

  let out = []

  idx.forEach(function(i){
    assert(i < arr.length, "Index out of bounds in the `slice` function!")
    if (i < 0) i += arr.length

    let item = arr[i]

    if (isArray(item)){
      out.push(slice(arr[i], indices.slice(1, indices.length)))
    } else {
      out.push(arr[i])
    }
  })

  if (shape(out).indexOf(1) > -1) out = flatten(out)

  return out
}

module.exports = slice

// tests
if (!module.parent && typeof(window) === "undefined"){
  let distance = require("./distance.js")

  let x = [[2, 3, 4], [5, 6, 7], [8, 9, 10]]
  let yTrue = [3, 6, 9]
  let yPred = slice(x, [null, 1])

  x = [[2, 3, 4], [5, 6, 7], [8, 9, 10]]
  yTrue = [[2, 3], [8, 9]]
  yPred = slice(x, [[0, 2], [0, 1]])

  assert(distance(yTrue, yPred) === 0, `slice([[2, 3, 4], [5, 6, 7], [8, 9, 10]], [[0, 2], [0, 1]]) should be [[2, 3], [8, 9]]!`)

  x = [5, 6, 7]
  assert(slice(x, [-1])[0] === 7, `slice([5, 6, 7], [-1]) should be [7]!`)

  x = [[2, 3, 4], [5, 6, 7], [8, 9, 10]]
  yTrue = [9]
  yPred = slice(x, [-1, -2])
  assert(distance(yTrue, yPred) === 0, `slice([[2, 3, 4], [5, 6, 7], [8, 9, 10]], [-1, -2]) should be [9]!`)

  let hasFailed

  try {
    hasFailed = false
    slice()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice() should have failed!`)

  try {
    hasFailed = false
    slice([2, 3, 4], [1.5, 2.5, 3.5])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice([2, 3, 4], [1.5, 2.5, 3.5]) should have failed!`)

  try {
    hasFailed = false
    slice([2, 3, 4], 0)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice([2, 3, 4], 0) should have failed!`)

  try {
    hasFailed = false
    slice("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice("foo") should have failed!`)

  try {
    hasFailed = false
    slice(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice(234) should have failed!`)

  try {
    hasFailed = false
    slice({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice({}) should have failed!`)

  try {
    hasFailed = false
    slice(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    slice(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `slice(foo) should have failed!`)

  console.log("All tests passed!")
}

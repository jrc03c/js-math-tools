let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let floor = require("./floor.js")
let range = require("./range.js")

let error = "You must pass an integer or a one-dimensional array of integers into the `ndarray` function!"

function ndarray(shape){
  assert(!isUndefined(shape), error)

  if (!isArray(shape)) shape = [shape]

  assert(shape.length > 0, error)

  shape.forEach(function(x){
    assert(isNumber(x), error)
    assert(floor(x) === x, error)
    assert(x >= 0, error)
  })

  if (shape.length === 1){
    return range(0, shape[0]).map(v => undefined)
  } else {
    let out = []
    for (let i=0; i<shape[0]; i++) out.push(ndarray(shape.slice(1, shape.length)))
    return out
  }
}

module.exports = ndarray

// tests
if (!module.parent && typeof(window) === "undefined"){
  let flatten = require("./flatten.js")

  assert(ndarray(3).length === 3, `ndarray(3) should have a length of 3!`)
  assert(ndarray([3]).length === 3, `ndarray([3]) should have a length of 3!`)
  assert(ndarray([3, 2]).length === 3, `ndarray([3, 2]) should have a length of 3!`)
  assert(flatten(ndarray([2, 3, 4])).length === 24, `flatten(ndarray([2, 3, 4])) should have a length of 24!`)

  let hasFailed

  try {
    hasFailed = false
    ndarray()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray() should have failed!`)

  try {
    hasFailed = false
    ndarray("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray("foo") should have failed!`)

  try {
    hasFailed = false
    ndarray(3.5)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(3.5) should have failed!`)

  try {
    hasFailed = false
    ndarray(-10)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(-10) should have failed!`)

  try {
    hasFailed = false
    ndarray({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray({}) should have failed!`)

  try {
    hasFailed = false
    ndarray(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(true) should have failed!`)

  try {
    hasFailed = false
    ndarray([])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray([]) should have failed!`)

  try {
    hasFailed = false
    ndarray(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    ndarray(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(foo) should have failed!`)

  try {
    hasFailed = false
    ndarray([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

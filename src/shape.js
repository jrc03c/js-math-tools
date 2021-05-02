let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let max = require("./max.js")

function shape(arr){
  assert(!isUndefined(arr), "You must pass an array into the `shape` function!")
  assert(isArray(arr), "You must pass an array into the `shape` function!")

  let out = [arr.length]
  let childrenAreArrays = arr.map(x => isArray(x))

  if (childrenAreArrays.indexOf(true) > -1){
    assert(childrenAreArrays.indexOf(false) < 0, "The array passed into the `shape` function has some children that are not themselves arrays!")

    let lengths = arr.map(x => x.length)
    let maxLength = max(lengths)

    lengths.forEach(function(length){
      assert(length === maxLength, "The array passed into the `shape` function has some children of inconsistent length!")
    })

    out = out.concat(shape(arr[0]))
  }

  return out
}

module.exports = shape

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")

  let yTrue = 500
  let yPred = shape(normal(yTrue))[0]
  assert(yTrue === yPred, `shape(normal(500)) should be 500, but instead was ${yPred}!`)

  yTrue = [2, 3, 4]
  yPred = shape(normal(yTrue))
  for (let i=0; i<yTrue.shape; i++) assert(yTrue[i] === yPred[i], `shape(normal([2, 3, 4])) should be [2, 3, 4]!`)

  let hasFailed

  try {
    hasFailed = false
    shape()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape() should have failed!`)

  try {
    hasFailed = false
    shape("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape("foo") should have failed!`)

  try {
    hasFailed = false
    shape(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape(234) should have failed!`)

  try {
    hasFailed = false
    shape(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape(true) should have failed!`)

  try {
    hasFailed = false
    shape({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape({}) should have failed!`)

  try {
    hasFailed = false
    shape(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    shape(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape(foo) should have failed!`)

  try {
    hasFailed = false
    shape([[2, 3, 4], [5, 6]])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shape([[2, 3, 4], [5, 6]]) should have failed!`)

  console.log("All tests passed!")
}

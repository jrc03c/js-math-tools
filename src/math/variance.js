let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let pow = require("./pow.js")
let std = require("./std.js")

function variance(arr){
  assert(!isUndefined(arr), "You must pass an array of numbers into the `variance` function!")
  assert(isArray(arr), "You must pass an array of numbers into the `std` function!")

  let temp = flatten(arr)

  temp.forEach(function(val){
    assert(isNumber(val), "You must pass an array of numbers into the `std` function!")
  })

  return pow(std(temp), 2)
}

module.exports = variance

// tests
if (!module.parent && !window){
  let abs = require("./abs.js")
  let normal = require("./normal.js")
  let scale = require("./scale.js")

  let x = normal(10000)
  let yTrue = 1
  let yPred = variance(x)
  assert(abs(yTrue - yPred) < 0.05, `variance(normal(10000)) should be approximately 1, but instead is ${yPred}!`)

  x = scale(normal([10, 10, 10, 10]), 2)
  yTrue = 4
  yPred = variance(x)
  assert(abs(yTrue - yPred) < 0.05, `variance(normal(10000) * 2) should be approximately 4, but instead is ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    variance()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance() should have failed!`)

  try {
    hasFailed = false
    variance("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance("foo") should have failed!`)

  try {
    hasFailed = false
    variance(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance(true) should have failed!`)

  try {
    hasFailed = false
    variance(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance(() => {}) should have failed!`)

  try {
    hasFailed = false
    variance({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance({}) should have failed!`)

  try {
    let foo
    hasFailed = false
    variance(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance(foo) should have failed!`)

  try {
    hasFailed = false
    variance([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `variance([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let arcsin = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `arcsin` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `arcsin` function!")
  assert(x >= -1 && x <= 1, "The `arcsin` function is only defined for -1 <= x <= 1!")
  return Math.asin(x)
})

module.exports = arcsin

// tests
if (!module.parent){
  let random = require("./random.js")

  let x = 0
  let yTrue = 0
  let yPred = arcsin(x)
  assert(yTrue === yPred, `arcsin(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 1
  yTrue = Math.PI / 2
  yPred = arcsin(x)
  assert(yTrue === yPred, `arcsin(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    arcsin()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin() should have failed!`)

  try {
    hasFailed = false
    arcsin("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin("foo") should have failed!`)

  try {
    hasFailed = false
    arcsin(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(true) should have failed!`)

  try {
    hasFailed = false
    arcsin(-2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(-2) should have failed!`)

  try {
    hasFailed = false
    arcsin(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(2) should have failed!`)

  try {
    hasFailed = false
    arcsin({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin({}) should have failed!`)

  try {
    hasFailed = false
    arcsin(random(100))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arcsin(random(100)) should have succeeded!`)

  try {
    hasFailed = false
    arcsin(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    arcsin(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arcsin(foo) should have failed!`)

  console.log("All tests passed!")
}

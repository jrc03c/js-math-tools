let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let arctan = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `arctan` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `arctan` function!")
  return Math.atan(x)
})

module.exports = arctan

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")

  let x = 0
  let yTrue = 0
  let yPred = arctan(x)
  assert(yTrue === yPred, `arctan(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 1
  yTrue = Math.PI / 4
  yPred = arctan(x)
  assert(yTrue === yPred, `arctan(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    arctan()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan() should have failed!`)

  try {
    hasFailed = false
    arctan("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan("foo") should have failed!`)

  try {
    hasFailed = false
    arctan(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan(true) should have failed!`)

  try {
    hasFailed = false
    arctan(-2)
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arctan(-2) should have succeeded!`)

  try {
    hasFailed = false
    arctan(2)
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arctan(2) should have succeeded!`)

  try {
    hasFailed = false
    arctan({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan({}) should have failed!`)

  try {
    hasFailed = false
    arctan(random(100))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arctan(random(100)) should have succeeded!`)

  try {
    hasFailed = false
    arctan(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    arctan(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arctan(foo) should have failed!`)

  console.log("All tests passed!")
}

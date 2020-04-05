let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let sin = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `sin` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `sin` function!")

  return Math.sin(x)
})

module.exports = sin

// tests
if (!module.parent && typeof(window) === "undefined"){
  let min = require("./min.js")
  let max = require("./max.js")
  let range = require("./range.js")

  let x = sin(range(0, 10 * Math.PI, Math.PI / 180))
  assert(min(x) === -1 && max(x) === 1, `sin(range(0, 10 * Math.PI, Math.PI / 100)) should be in the range [-1, 1]!`)

  let hasFailed

  try {
    hasFailed = false
    sin()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin() should have failed!`)

  try {
    hasFailed = false
    sin("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin("foo") should have failed!`)

  try {
    hasFailed = false
    sin(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin(true) should have failed!`)

  try {
    hasFailed = false
    sin({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin({}) should have failed!`)

  try {
    hasFailed = false
    sin(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    sin(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sin(foo) should have failed!`)

  console.log("All tests passed!")
}

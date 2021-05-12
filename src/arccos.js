let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let arccos = vectorize(function(x){
  try {
		return Math.acos(x)
	} catch(e) {
		return NaN
	}
})

module.exports = arccos

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")

  let x = 0
  let yTrue = Math.PI / 2
  let yPred = arccos(x)
  assert(yTrue === yPred, `arccos(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 1
  yTrue = 0
  yPred = arccos(x)
  assert(yTrue === yPred, `arccos(${x}) should be ${yTrue}, but instead is ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    arccos()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos() should have failed!`)

  try {
    hasFailed = false
    arccos("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos("foo") should have failed!`)

  try {
    hasFailed = false
    arccos(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(true) should have failed!`)

  try {
    hasFailed = false
    arccos(-2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(-2) should have failed!`)

  try {
    hasFailed = false
    arccos(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(2) should have failed!`)

  try {
    hasFailed = false
    arccos({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos({}) should have failed!`)

  try {
    hasFailed = false
    arccos(random(100))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `arccos(random(100)) should have succeeded!`)

  try {
    hasFailed = false
    arccos(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    arccos(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `arccos(foo) should have failed!`)

  console.log("All tests passed!")
}

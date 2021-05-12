let add = require("./add.js")
let dropNaN = require("./drop-nan.js")
let flatten = require("./flatten.js")

function sum(arr){
  try {
		return add(...dropNaN(flatten(arr)))
	} catch(e) {
		return NaN
	}
}

module.exports = sum

// tests
if (!module.parent && typeof(window) === "undefined"){
  let range = require("./range.js")
  let normal = require("./normal.js")
  let abs = require("./abs.js")

  let x = [2, 3, 4]
  let yTrue = 9
  let yPred = sum(x)
  assert(yTrue === yPred, `sum([2, 3, 4]) should be 9, but instead is ${yPred}!`)

  x = range(-100, 101)
  yTrue = 0
  yPred = sum(x)
  assert(yTrue === yPred, `sum(range(-100, 101)) should be 0, but instead is ${yPred}!`)

  x = []
  yTrue = undefined
  yPred = sum(x)
  assert(yTrue === yPred, `sum([]) should be undefined, but instead was ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    sum()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum() should have failed!`)

  try {
    hasFailed = false
    sum("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum("foo") should have failed!`)

  try {
    hasFailed = false
    sum(123)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum(123) should have failed!`)

  try {
    hasFailed = false
    sum(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum(true) should have failed!`)

  try {
    hasFailed = false
    sum(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum(() => {}) should have failed!`)

  try {
    hasFailed = false
    sum({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sum({}) should have failed!`)

  try {
    hasFailed = false
    sum([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `sum([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

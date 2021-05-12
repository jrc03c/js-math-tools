let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let pow = require("./pow.js")
let std = require("./std.js")
let dropNaN = require("./drop-nan.js")

function variance(arr){
  try {
		let temp = dropNaN(flatten(arr))
  	if (temp.length === 0) return NaN
  	return pow(std(temp), 2)
	} catch(e) {
		return NaN
	}
}

module.exports = variance

// tests
if (!module.parent && typeof(window) === "undefined"){
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
  assert(abs(yTrue - yPred) < 0.1, `variance(normal(10000) * 2) should be approximately 4, but instead is ${yPred}!`)

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

  assert(!hasFailed, `variance([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

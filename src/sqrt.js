let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let sqrt = vectorize(function(x){
  try {
		if (x < 0) return NaN
		return Math.sqrt(x)
	} catch(e) {
		return NaN
	}
})

module.exports = sqrt

// tests
if (!module.parent && typeof(window) === "undefined"){
  let distance = require("./distance.js")

  let x = 4
  let yTrue = 2
  let yPred = sqrt(x)
  assert(yTrue === yPred, `sqrt(4) should be 2, but instead was ${yPred}!`)

  x = [9, 4, 16]
  yTrue = [3, 2, 4]
  yPred = sqrt(x)
  assert(distance(yTrue, yPred) === 0, `sqrt([9, 4, 16]) should be [3, 2, 4]!`)

  let hasFailed

  try {
    hasFailed = false
    sqrt()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt() should have failed!`)

  try {
    hasFailed = false
    sqrt("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt("foo") should have failed!`)

  try {
    hasFailed = false
    sqrt(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt(true) should have failed!`)

  try {
    hasFailed = false
    sqrt({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt({}) should have failed!`)

  try {
    hasFailed = false
    sqrt(-4)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt(-4) should have failed!`)

  try {
    hasFailed = false
    sqrt(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    sqrt(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sqrt(foo) should have failed!`)

  console.log("All tests passed!")
}

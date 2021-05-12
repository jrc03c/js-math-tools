let assert = require("./assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let ceil = vectorize(function(x){
  try {
		return Math.ceil(x)
	} catch(e) {
		return NaN
	}
})

module.exports = ceil

// tests
if (!module.parent && typeof(window) === "undefined"){
  let x = 3.5
  let yTrue = 4
  let yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 3.25
  yTrue = 4
  yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = -17.2
  yTrue = -17
  yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [2.5, 3.4, 7.9]
  yTrue = [3, 4, 8]
  yPred = ceil(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `ceil(${x[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed
  x = "foo"

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  x = [true, 2, 3]

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  x = {x: 5}

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  let foo

  try {
    hasFailed = false
    ceil(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(foo) should have failed!`)

  console.log("All tests passed!")
}

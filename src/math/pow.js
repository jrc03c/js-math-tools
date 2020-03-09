let vectorize = require("./vectorize.js")
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")

let pow = vectorize(function(x, p){
  assert(!isUndefined(x) && !isUndefined(p), "You must pass two numbers (or two equally-sized arrays of numbers) into the `pow` function!")
  assert(isNumber(x) && isNumber(p), "You must pass two numbers (or two equally-sized arrays of numbers) into the `pow` function!")

  return Math.pow(x, p)
})

module.exports = pow

// tests
if (!module.parent){
  let x = 3
  let p = 2
  let yTrue = 9
  let yPred = pow(x, p)
  assert(yTrue === yPred, `pow(${x}, ${p}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [3, 4, 5]
  p = 2
  yTrue = [9, 16, 25]
  yPred = pow(x, p)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `pow(${x[i]}, ${p}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = 3
  p = [2, 3, 4]
  yTrue = [9, 27, 81]
  yPred = pow(x, p)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `pow(${x}, ${p[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = [2, 3, 4]
  p = [2, 3, 4]
  yTrue = [4, 27, 256]
  yPred = pow(x, p)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `pow(${x[i]}, ${p[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    pow()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow() should have failed!`)

  try {
    hasFailed = false
    pow(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(2) should have failed!`)

  try {
    hasFailed = false
    pow(2, "three")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(2, "three") should have failed!`)

  try {
    hasFailed = false
    pow("two", 3)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow("two", 3) should have failed!`)

  try {
    hasFailed = false
    pow(true, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(true, true) should have failed!`)

  try {
    hasFailed = false
    pow({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow({}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    pow(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    pow(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `pow(fn, fn) should have failed!`)

  console.log("All tests passed!")
}

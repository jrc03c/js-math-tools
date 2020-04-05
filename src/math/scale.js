let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let scale = vectorize(function(a, b){
  assert(!isUndefined(a) && !isUndefined(b), "You must pass two numbers (or an array of numbers and a number, or a number and an array of numbers, or two arrays of numbers) into the `scale` function!")
  assert(isNumber(a) && isNumber(b), "You must pass two numbers (or an array of numbers and a number, or a number and an array of numbers, or two arrays of numbers) into the `scale` function!")

  return a * b
})

module.exports = scale

// tests
if (!module.parent && !window){
  let a = 3
  let b = 5
  let yTrue = 15
  let yPred = scale(a, b)
  assert(yTrue === yPred, `scale(${a}, ${b}) should be ${yTrue}, but instead was ${yPred}!`)

  a = [3, 4, 5]
  b = 5
  yTrue = [15, 20, 25]
  yPred = scale(a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `scale(${a[i]}, ${b}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  a = 3
  b = [5, 6, 7]
  yTrue = [15, 18, 21]
  yPred = scale(a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `scale(${a}, ${b[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  a = [2, 3, 4]
  b = [5, 6, 7]
  yTrue = [10, 18, 28]
  yPred = scale(a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `scale(${a[i]}, ${b[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    scale()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale() should have failed!`)

  try {
    hasFailed = false
    scale("two", "three")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale("two", "three") should have failed!`)

  try {
    hasFailed = false
    scale(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale(true, false) should have failed!`)

  try {
    hasFailed = false
    scale({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale({}, {}) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    scale(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    scale(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `scale(foo, foo) should have failed!`)

  console.log("All tests passed!")
}

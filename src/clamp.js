let assert = require("./assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let clamp = vectorize(function(x, a, b){
  assert(!isUndefined(x) && !isUndefined(a) && !isUndefined(b), "You must pass exactly three numbers (or three equally-sized arrays of numbers) into the `clamp` function!")

  assert(isNumber(x), "The `clamp` function only works on numbers!")
  assert(isNumber(a), "The `clamp` function only works on numbers!")
  assert(isNumber(b), "The `clamp` function only works on numbers!")

  assert(a < b, `The minimum parameter, a, must be less than the maximum parameter, b.`)

  if (x < a) return a
  if (x > b) return b
  return x
})

module.exports = clamp

// tests
if (!module.parent && typeof(window) === "undefined"){
  let x = 5
  let a = 1
  let b = 10
  let yTrue = 5
  let yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = -100
  a = 1
  b = 10
  yTrue = a
  yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 999
  a = 1
  b = 10
  yTrue = b
  yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = [0, 100, 1000]
  a = 5
  b = 500
  yTrue = [5, 100, 500]
  yPred = clamp(x, a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `clamp(${x[i]}, ${a}, ${b}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = [0, 100, 1000]
  a = [5, 10, 15]
  b = [100, 200, 300]
  yTrue = [5, 100, 300]
  yPred = clamp(x, a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `clamp(${x[i]}, ${a[i]}, ${b[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}.`)

  x = 5
  a = 10
  b = 1
  let hasFailed = false

  try {
    clamp(x, a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(${x}, ${a}, ${b}) should have failed!`)

  x = "foo"
  a = "bar"
  b = "baz"
  hasFailed = false

  try {
    clamp(x, a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(${x}, ${a}, ${b}) should have failed!`)

  let foo
  hasFailed = false

  try {
    clamp(foo, foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(foo, foo, foo) should have failed!`)

  console.log("All tests passed!")
}

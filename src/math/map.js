let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let map = vectorize(function(x, a, b, c, d){
  assert(!isUndefined(x) && !isUndefined(a) && !isUndefined(b) && !isUndefined(c) && !isUndefined(d), "You should pass five numbers (or five equally-sized arrays of numbers) into the `map` function!")

  assert(isNumber(x) && isNumber(a) && isNumber(b) && isNumber(c) && isNumber(d), "The `map` function only works on numbers!")

  return (d - c) * (x - a) / (b - a) + c
})

module.exports = map

// tests
if (!module.parent){
  let x = 1
  let a = 0
  let b = 2
  let c = 0
  let d = 10
  let yTrue = 5
  let yPred = map(x, a, b, c, d)
  assert(yTrue === yPred, `map(${x}, ${a}, ${b}, ${c}, ${c}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 2
  a = 1
  b = 3
  c = 100
  d = 500
  yTrue = 300
  yPred = map(x, a, b, c, d)
  assert(yTrue === yPred, `map(${x}, ${a}, ${b}, ${c}, ${c}) should be ${yTrue}, but instead is ${yPred}!`)

  x = [1, 2, 3]
  a = 0
  b = 4
  c = 100
  d = 500
  yTrue = [200, 300, 400]
  yPred = map(x, a, b, c, d)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `map(${x[i]}, ${a}, ${b}, ${c}, ${d}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    map(1, 2, 3, 4, "five")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, "five") should have failed!`)

  try {
    hasFailed = false
    map()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map() should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    map(1, 2, 3, 4, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, foo) should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, () => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, () => {}) should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, true) should have failed!`)

  console.log("All tests passed!")
}

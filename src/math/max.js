let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")

function max(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `max` function!")

  assert(isArray(arr), "You must pass one array of numbers into the `max` function!")

  arr.forEach(function(value){
    assert(isNumber(value) || isArray(value), "The `max` function only works on numbers or arrays of numbers!")
  })

  let out = -Infinity

  arr.forEach(function(x){
    if (isArray(x)){
      let xMax = max(x)
      if (xMax > out) out = xMax
    } else if (isNumber(x) && x > out){
      out = x
    }
  })

  return out === -Infinity ? undefined : out
}

module.exports = max

// tests
if (!module.parent){
  let normal = require("./normal.js")
  let random = require("./random.js")
  let min = require("./min.js")

  let x = [2, 3, 4]
  let y = max(x)
  assert(y === 4, `max([2, 3, 4]) should be 4, but instead was ${y}!`)

  x = [-10, -5, -20]
  y = max(x)
  assert(y === -5, `max([-10, -5, -20]) should be -5, but instead was ${y}!`)

  x = random([10000])
  y = max(x)
  assert(y <= 1 && y >= 0, `max(random([10000])) should be >= 0 and <= 1!`)

  x = normal([10000])
  xMin = min(x)
  xMax = max(x)
  xRange = xMax - xMin
  x = x.map(v => (v - xMin) / xRange)
  assert(max(x) === 1, `max(normalizedData) should be 1!`)

  let hasFailed

  try {
    hasFailed = false
    max()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max() should have failed!`)

  try {
    hasFailed = false
    max(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(2) should have failed!`)

  try {
    hasFailed = false
    max(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(true) should have failed!`)

  try {
    hasFailed = false
    max({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max({}) should have failed!`)

  try {
    hasFailed = false
    max(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(() => {}) should have failed!`)

  try {
    hasFailed = false
    max([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    max("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max("foo") should have failed!`)

  try {
    let foo
    hasFailed = false
    max(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(foo) should have failed!`)

  console.log("All tests passed!")
}

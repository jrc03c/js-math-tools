let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let abs = require("./abs.js")
let vectorize = require("./vectorize.js")

let chop = vectorize(function(x, threshold){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `chop` function!")
  assert(isNumber(x), "The `chop` function only works on numbers!")

  threshold = isUndefined(threshold) ? 1e-10 : threshold
  assert(isNumber(threshold), "The `chop` function only works on numbers!")

  return abs(x) < threshold ? 0 : x
})

module.exports = chop

// tests
if (!module.parent){
  let x = 1
  let y = chop(x)
  assert(y === 1, `chop(1) should be 1, but instead is ${y}!`)

  x = 0
  y = chop(x)
  assert(y === 0, `chop(0) should be 0, but instead is ${y}!`)

  x = 1e-15
  y = chop(x)
  assert(y === 0, `chop(1e-15) should be 0, but instead is ${y}!`)

  x = 100
  y = chop(x)
  assert(y === 100, `chop(100) should be 100, but instead is ${y}!`)

  x = -100
  y = chop(x)
  assert(y === -100, `chop(-100) should be -100, but instead is ${y}!`)

  x = [1e-20, 1e-15, 1e-5]
  let yTrue = [0, 0, 1e-5]
  yPred = chop(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `chop(x[i]) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)

  x = [1, 1, 1]
  thresholds = [1e-1, 1e0, 1e1]
  yTrue = [1, 1, 0]
  yPred = chop(x, thresholds)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `chop(x[i]) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    chop(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(true) should have failed!`)

  try {
    hasFailed = false
    chop({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop({}) should have failed!`)

  try {
    hasFailed = false
    chop("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop("foo") should have failed!`)

  try {
    hasFailed = false
    chop(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(() => {})) should have failed!`)

  try {
    hasFailed = false
    chop([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop([1, 2, "three"]) should have failed!`)

  try {
    let foo
    hasFailed = false
    chop(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(foo) should have failed!`)

  try {
    hasFailed = false
    chop([2, 3, 4], [5, 6, "seven"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop([2, 3, 4], [5, 6, "seven"]) should have failed!`)

  console.log("All tests passed!")
}

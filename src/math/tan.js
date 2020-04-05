let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")
let floor = require("./floor.js")

let tan = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `tan` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `tan` function!")

  let k = (x - Math.PI / 2) / Math.PI
  if (k === floor(k)) return undefined
  return Math.tan(x)
})

module.exports = tan

// tests
if (!module.parent && !window){
  let abs = require("./abs.js")
  let normal = require("./normal.js")

  let x = Math.PI / 4
  let yTrue = 1
  let yPred = tan(x)
  assert(abs(yTrue - yPred) < 0.01, `tan(pi / 4) should be 1, but instead was ${yPred}!`)

  x = -Math.PI / 2
  yTrue = undefined
  yPred = tan(x)
  assert(yTrue === yPred, "tan(-pi / 2) should be undefined, but instead was ${yPred}!")

  x = 2 * Math.PI
  yTrue = 0
  yPred = tan(x)
  assert(abs(yTrue - yPred) < 0.01, `tan(2 * pi) should be 0, but instead was ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    tan()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan() should have failed!`)

  try {
    hasFailed = false
    tan(normal(10000))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `tan(normal(10000)) should not have failed!`)

  try {
    hasFailed = false
    tan("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan("foo") should have failed!`)

  try {
    hasFailed = false
    tan(true,)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan(true) should have failed!`)

  try {
    hasFailed = false
    tan({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan({}) should have failed!`)

  try {
    hasFailed = false
    tan(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    tan(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `tan(foo) should have failed!`)

  console.log("All tests passed!")
}

let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let round = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a number or an array of numbers into the `round` function!")
  assert(isNumber(x), "You must pass a number or an array of numbers into the `round` function!")

  return Math.round(x)
})

module.exports = round

// tests
if (!module.parent && !window){
  let random = require("./random.js")
  let set = require("./set.js")
  let sort = require("./sort.js")

  let yTrue = 2
  let yPred = round(2.34)
  assert(yTrue === yPred, `round(2.34) should be 2, but instead was ${yPred}!`)

  yTrue = 3
  yPred = round(2.5)
  assert(yTrue === yPred, `round(2.5) should be 3, but instead was ${yPred}!`)

  yTrue = -4
  yPred = round(-3.75)
  assert(yTrue === yPred, `round(-3.75) should be -4, but instead was ${yPred}!`)

  yPred = sort(set(round(random([10, 10, 10, 10]))), function(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })

  assert(yPred[0] === 0 && yPred[1] === 1 && yPred.length === 2, `sort(set(round(random([10, 10, 10, 10])))) should be [0, 1]!`)

  let hasFailed

  try {
    hasFailed = false
    round()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round() should have failed!`)

  try {
    hasFailed = false
    round("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round("foo") should have failed!`)

  try {
    hasFailed = false
    round(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round(true) should have failed!`)

  try {
    hasFailed = false
    round({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round({}) should have failed!`)

  try {
    hasFailed = false
    round(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    round(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `round(foo) should have failed!`)

  console.log("All tests passed!")
}

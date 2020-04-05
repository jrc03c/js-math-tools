let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")

function min(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `min` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `min` function!")

  let temp = flatten(arr)

  temp.forEach(function(item){
    assert(isNumber(item), "The `min` function only works on arrays of numbers!")
  })

  let out = Infinity

  temp.forEach(function(x){
    if (x < out){
      out = x
    }
  })

  return out === Infinity ? undefined : out
}

module.exports = min

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")

  let x = [4, 2, 3]
  let yTrue = 2
  let yPred = min(x)
  assert(yTrue === yPred, `min([4, 2, 3]) should be 2, but instead was ${yPred}!`)

  x = [[-50, 50, 234], [100, -100, 0]]
  yTrue = -100
  yPred = min(x)
  assert(yTrue === yPred, `min([[-50, 50, 234], [100, -100, 0]]) should be -100, but instead was ${yPred}!`)

  x = random([2, 3, 4, 5])
  yPred = min(x)
  assert(yPred <= 1 && yPred >= 0, `min(random([2, 3, 4, 5])) should be >= 0 and <= 1!`)

  let hasFailed

  try {
    hasFailed = false
    min()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min() should have failed!`)

  try {
    hasFailed = false
    min(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min(234) should have failed!`)

  try {
    hasFailed = false
    min({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min({}) should have failed!`)

  try {
    hasFailed = false
    min("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min("foo") should have failed!`)

  try {
    hasFailed = false
    min(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min(true) should have failed!`)

  try {
    hasFailed = false
    min([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    min([() => {}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([() => {}]) should have failed!`)

  try {
    let foo
    hasFailed = false
    min([foo, foo, foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([foo, foo, foo]) should have failed!`)

  console.log("All tests passed!")
}

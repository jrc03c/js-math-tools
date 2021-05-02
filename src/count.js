let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let flatten = require("./flatten.js")

function count(arr, items){
  assert(!isUndefined(arr), "You must an array and an item to count to the `count` function!")
  assert(isArray(arr), "You must an array and an item to count to the `count` function!")

  // NOTE: This currently flattens the array that's passed in, which means that it's not possible to count occurrences of arrays within arrays! I'm not sure whether this is desirable behavior or not, so I'm just making a note of it for now. It's not trivial to count occurrences of identical objects, so maybe this function should refuse to operate on objects!
  let temp = flatten(arr)

  if (isArray(items)){
    return flatten(items).map(function(item1){
      return temp.filter(item2 => item2 === item1).length
    })
  } else {
    return temp.filter(other => other === items).length
  }
}

module.exports = count

// tests
if (!module.parent && typeof(window) === "undefined"){
  let random = require("./random.js")
  let round = require("./round.js")
  let abs = require("./abs.js")

  let x = [2, 2, 2, 3, 4, 2, 2]
  let yTrue = 5
  let yPred = count(x, 2)
  assert(yTrue === yPred)

  x = [true, true, false, false, false, "a", "a", "a", "a", "a"]
  yTrue = [2, 3, 5]
  yPred = count(x, [true, false, "a"])
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `count([true, true, false, false, false, "a", "a", "a", "a", "a"], [true, false, "a"]) should be [2, 3, 5]!`)

  x = round(random([10000]))
  let y1 = count(x, 0)
  let y2 = count(x, 1)
  assert(abs(y1 - 5000) < 0.05 * 5000, `count(round(random([10000])), 0) should be approximately 5000!`)
  assert(abs(y2 - 5000) < 0.05 * 5000, `count(round(random([10000])), 1) should be approximately 5000!`)

  assert(count([2, 3, 4]) === 0, `count([2, 3, 4]) should be 0!`)

  let hasFailed

  try {
    hasFailed = false
    count()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count() should have failed!`)

  try {
    hasFailed = false
    count(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(234) should have failed!`)

  try {
    hasFailed = false
    count(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(true) should have failed!`)

  try {
    hasFailed = false
    count("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count("foo") should have failed!`)

  try {
    hasFailed = false
    count({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count({}) should have failed!`)

  try {
    hasFailed = false
    count(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(() => {}) should have failed!`)

  console.log("All tests passed!")
}

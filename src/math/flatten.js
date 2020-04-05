let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")

function flatten(arr){
  assert(!isUndefined(arr), "You must pass one array into the `flatten` function!")
  assert(isArray(arr), "The `flatten` function only works on arrays!")

  let out = []

  arr.forEach(function(value){
    if (isArray(value)){
      out = out.concat(flatten(value))
    } else {
      out.push(value)
    }
  })

  return out
}

module.exports = flatten

// tests
if (!module.parent && !window){
  let normal = require("./normal.js")

  let x = [2, 3, 4]
  let yTrue = [2, 3, 4]
  let yPred = flatten(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `flatten([2, 3, 4]) should be [2, 3, 4]!`)

  x = [[2, 3, 4], [5, 6, 7]]
  yTrue = [2, 3, 4, 5, 6, 7]
  yPred = flatten(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `flatten([[2, 3, 4], [5, 6, 7]]) should be [2, 3, 4, 5, 6, 7]!`)

  x = normal([2, 3, 4, 5])
  yPred = flatten(x)
  assert(yPred.length === 120, `flatten(normal([2, 3, 4, 5])) should have 120 values!`)

  let hasFailed

  try {
    hasFailed = false
    flatten()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten() should have failed!`)

  try {
    hasFailed = false
    flatten({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten({}) should have failed!`)

  try {
    hasFailed = false
    flatten(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten(true) should have failed!`)

  try {
    hasFailed = false
    flatten("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten("foo") should have failed!`)

  try {
    hasFailed = false
    flatten(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten(() => {}) should have failed!`)

  console.log("All tests passed!")
}

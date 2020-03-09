let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let min = require("./min.js")
let max = require("./max.js")
let apply = require("../misc/apply.js")

function normalize(arr){
  assert(!isUndefined(arr), "You must pass an array of numbers into the `normalize` function!")
  assert(isArray(arr), "You must pass an array of numbers into the `normalize` function!")

  flatten(arr).forEach(function(value){
    assert(isNumber(value), "The `normalize` function only works on numbers!")
  })

  let arrMin = min(arr)
  let arrMax = max(arr)
  let arrRange = arrMax - arrMin
  return apply(arr, v => (v - arrMin) / arrRange)
}

module.exports = normalize

// tests
if (!module.parent){
  let random = require("./random.js")
  let normal = require("./normal.js")
  let add = require("./add.js")
  let scale = require("./scale.js")

  let x = normal(10000)
  let y = normalize(x)
  assert(min(y) === 0, `The minimum value of normalize(normal(10000)) should be 0!`)
  assert(max(y) === 1, `The maximum value of normalize(normal(10000)) should be 1!`)

  x = add(scale(random(10000), 100), -250)
  y = normalize(x)
  assert(min(y) === 0, `The minimum value of normalize(add(scale(random(10000), 100), -250)) should be 0!`)
  assert(max(y) === 1, `The minimum value of normalize(add(scale(random(10000), 100), -250)) should be 1!`)

  let hasFailed

  try {
    hasFailed = false
    normalize()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize() should have failed!`)

  try {
    hasFailed = false
    normalize([true])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize(true) should have failed!`)

  try {
    hasFailed = false
    normalize(["foo"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize(["foo"]) should have failed!`)

  try {
    hasFailed = false
    normalize([{}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize([{}]) should have failed!`)

  try {
    let foo
    hasFailed = false
    normalize([foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize([foo]) should have failed!`)

  try {
    hasFailed = false
    normalize([() => {}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normalize([() => {}]) should have failed!`)

  console.log("All tests passed!")
}

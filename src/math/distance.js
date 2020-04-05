let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let shape = require("./shape.js")
let flatten = require("./flatten.js")
let pow = require("./pow.js")
let sum = require("./sum.js")
let add = require("./add.js")
let scale = require("./scale.js")

function distance(a, b){
  assert(!isUndefined(a) && !isUndefined(b), "You must pass two congruently-shaped arrays of numbers into the `distance` function!")

  let shape1 = shape(a)
  let shape2 = shape(b)

  assert(shape1.length === shape2.length, "You must pass two congruently-shaped arrays of numbers into the `distance` function!")

  assert(sum(add(shape1, scale(shape2, -1))) === 0, "You must pass two congruently-shaped arrays of numbers into the `distance` function!")

  flatten(a).concat(flatten(b)).forEach(function(value){
    assert(isNumber(value), "The `distance` function only works on numbers!")
  })

  return pow(sum(pow(add(a, scale(b, -1)), 2)), 0.5)
}

module.exports = distance

// tests
if (!module.parent && !window){
  let normal = require("./normal.js")

  let a = [4, 6]
  let b = [1, 2]
  assert(distance(a, b) === 5, `distance([4, 6], [1, 2]) should be 5!`)

  a = [-2, -2]
  b = [-1, -1]
  assert(distance(a, b) === pow(2, 0.5), `distance([-2, -2], [-1, -1]) should be sqrt(2)!`)

  a = normal([5, 5, 5, 5])
  assert(distance(a, a) === 0, `distance(x, x) should be 0!`)

  let hasFailed

  try {
    hasFailed = false
    distance()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance() should have failed!`)

  try {
    hasFailed = false
    distance(normal(5), normal(6))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance(normal(5), normal(6)) should have failed!`)

  try {
    hasFailed = false
    distance(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance(true, false) should have failed!`)

  try {
    hasFailed = false
    distance("foo", "bar")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance("foo", "bar") should have failed!`)

  try {
    hasFailed = false
    distance({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance({}, {}) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    distance(fn, fn,)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    distance(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distance(foo, foo) should have failed!`)

  console.log("All tests passed!")
}

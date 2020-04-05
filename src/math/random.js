let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")
let isUndefined = require("./is-undefined.js")

function random(shape){
  if (isUndefined(shape)) return Math.random()
  return apply(ndarray(shape), Math.random)
}

module.exports = random

// tests
if (!module.parent && !window){
  console.log("TO-DO: Implement PRNG / seeding in `random`?")

  let assert = require("../misc/assert.js")
  let min = require("./min.js")
  let max = require("./max.js")
  let abs = require("./abs.js")
  let mean = require("./mean.js")

  let x = random([10, 10, 10, 10])
  assert(min(x) >= 0 && max(x) <= 1, `random([10, 10, 10, 10]) should be in the range [0, 1]!`)
  assert(abs(mean(x)) - 0.5 < 0.05, `random([10, 10, 10, 10]) should have a mean of approximately 0.5!`)

  x = random()
  assert(x >= 0 && x <= 1, `random() should be in the range [0, 1]!`)

  let hasFailed

  try {
    hasFailed = false
    random("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random("foo") should have failed!`)

  try {
    hasFailed = false
    random(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random(true) should have failed!`)

  try {
    hasFailed = false
    random({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random({}) should have failed!`)

  try {
    hasFailed = false
    random(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random(() => {}) should have failed!`)

  try {
    hasFailed = false
    random([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `random([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

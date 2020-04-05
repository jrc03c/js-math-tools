let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")
let isUndefined = require("./is-undefined.js")
// let seed = require("./seed.js")

// function lcg(){
//   let a = 13
//   let c = 911
//   let m = 11584577
//   let s = seed()
//   let out = (a * s + c) % m
//   seed(out)
//   return out / m
// }

function random(shape){
  if (isUndefined(shape)) return Math.random()
  return apply(ndarray(shape), random)
}

module.exports = random

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")
  let distance = require("./distance.js")
  let min = require("./min.js")
  let max = require("./max.js")
  let abs = require("./abs.js")
  let mean = require("./mean.js")

  let x = random([10, 10, 10, 10])
  assert(min(x) >= 0 && max(x) <= 1, `random([10, 10, 10, 10]) should be in the range [0, 1]!`)
  assert(abs(mean(x)) - 0.5 < 0.05, `random([10, 10, 10, 10]) should have a mean of approximately 0.5!`)

  x = random()
  assert(x >= 0 && x <= 1, `random() should be in the range [0, 1]!`)

  // seed(203948203948)
  // let a = random([10, 10, 10, 10])
  // seed(203948203948)
  // let b = random([10, 10, 10, 10])
  // assert(distance(a, b) === 0, "Two random arrays seeded with the same value should be identical!")

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

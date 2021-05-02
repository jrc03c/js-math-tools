let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let floor = require("./floor.js")
let random = require("./random.js")

function shuffle(arr){
  assert(!isUndefined(arr), "You must pass an array into the `shuffle` function!")
  assert(isArray(arr), "You must pass an array into the `shuffle` function!")

  let out = arr.slice()

  for (let i=0; i<arr.length; i++){
    let index1 = floor(random() * arr.length)
    let index2 = floor(random() * arr.length)
    let buffer = out[index1]
    out[index1] = out[index2]
    out[index2] = buffer
  }

  return out
}

module.exports = shuffle

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let seed = require("./seed.js")
  let distance = require("./distance.js")

  let a = normal(10000)
  let b = shuffle(a)

  assert(distance(a, b) > 0, `shuffle(a) should not be in the same order as a!`)

  a = normal(10000)
  seed(20394230948)
  a1 = shuffle(a)
  seed(20394230948)
  a2 = shuffle(a)

  assert(distance(a1, a2) === 0, `Shuffling using the same seed should produce the same results!`)

  let hasFailed

  try {
    hasFailed = false
    shuffle()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle() should have failed!`)

  try {
    hasFailed = false
    shuffle("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle("foo") should have failed!`)

  try {
    hasFailed = false
    shuffle(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(true) should have failed!`)

  try {
    hasFailed = false
    shuffle({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle({}) should have failed!`)

  try {
    hasFailed = false
    shuffle(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(234) should have failed!`)

  try {
    hasFailed = false
    shuffle(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(() => {}) should have failed!`)

  try {
    hasFailed = false
    shuffle(random([2, 3, 4]))
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `shuffle(random([2, 3, 4])) should not have failed!`)

  console.log("All tests passed!")
}

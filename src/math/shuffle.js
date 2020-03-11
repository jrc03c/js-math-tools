let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let floor = require("./floor.js")
let random = require("./random.js")

function shuffle(arr){
  assert(!isUndefined(arr), "You must pass a one-dimensional array into the `shuffle` function!")
  assert(isArray(arr), "You must pass a one-dimensional array into the `shuffle` function!")

  arr.forEach(function(item){
    assert(!isArray(item), "You must pass a one-dimensional array into the `shuffle` function!")
  })

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
if (!module.parent){
  let normal = require("./normal.js")

  let a = normal(10000)
  let b = shuffle(a)
  let allAreTheSame = true

  for (let i=0; i<a.length; i++){
    if (a[i] !== b[i]){
      allAreTheSame = false
      break
    }
  }

  assert(!allAreTheSame, `shuffle(a) should not be in the same order as a!`)

  let hasFailed

  try {
    hasFailed = true
    shuffle()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle() should have failed!`)

  try {
    hasFailed = true
    shuffle("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle("foo") should have failed!`)

  try {
    hasFailed = true
    shuffle(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(true) should have failed!`)

  try {
    hasFailed = true
    shuffle({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle({}) should have failed!`)

  try {
    hasFailed = true
    shuffle(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(234) should have failed!`)

  try {
    hasFailed = true
    shuffle(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(() => {}) should have failed!`)

  try {
    hasFailed = true
    shuffle(random([2, 3, 4]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `shuffle(random([2, 3, 4])) should have failed!`)

  console.log("All tests passed!")
}

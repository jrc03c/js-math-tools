let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let mean = require("./mean.js")
let pow = require("./pow.js")
let sqrt = require("./sqrt.js")

function std(arr){
  assert(!isUndefined(arr), "You must pass an array of numbers into the `std` function!")
  assert(isArray(arr), "You must pass an array of numbers into the `std` function!")

  let temp = flatten(arr)
  if (temp.length === 0) return undefined

  temp.forEach(function(v){
    assert(isNumber(v), "You must pass an array of numbers into the `std` function!")
  })

  let m = mean(temp)
  let out = 0
  temp.forEach(x => out += pow(x - m, 2))
  return sqrt(out / temp.length)
}

module.exports = std

// tests
if (!module.parent){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let add = require("./add.js")
  let scale = require("./scale.js")

  let x = normal(10000)
  assert(abs(std(x) - 1) < 0.05, `std(normal(10000)) should be approximately 1!`)

  x = add(scale(x, 100), -250)
  assert(abs(std(x) - 100) < 5, `std(normal(10000) * 100 - 250) should be approximately 100!`)

  let hasFailed

  try {
    hasFailed = false
    std()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std() should have failed!`)

  try {
    hasFailed = false
    std(123)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std(123) should have failed!`)

  try {
    hasFailed = false
    std("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std("foo") should have failed!`)

  try {
    hasFailed = false
    std(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std(true) should have failed!`)

  try {
    hasFailed = false
    std({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std({}) should have failed!`)

  try {
    hasFailed = false
    std(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    std(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `std(foo) should have failed!`)

  console.log("All tests passed!")
}

let assert = require("./assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let cos = vectorize(function(x){
  try {
		return Math.cos(x)
	} catch(e) {
		return NaN
	}
})

module.exports = cos

// tests
if (!module.parent && typeof(window) === "undefined"){
  let min = require("./min.js")
  let max = require("./max.js")
  let normal = require("./normal.js")
  let chop = require("./chop.js")

  let x = normal([10000]).map(v => v * 100)
  let y = cos(x)

  assert(min(y) >= -1, "Values produced by the `cos` function should never be below -1!")
  assert(max(y) <= 1, "Values produced by the `cos` function should never be above 1!")

  x = 0
  y = cos(x)
  assert(y === 1, `cos(0) should be 1, but instead is ${y}!`)

  x = Math.PI / 2
  y = cos(x)
  assert(chop(y) === 0, `cos(Math.PI / 2) should be 0, but instead is ${y}!`)

  x = Math.PI
  y = cos(x)
  assert(y === -1, `cos(Math.PI) should be -1, but instead is ${y}!`)

  x = 3 * Math.PI / 2
  y = cos(x)
  assert(chop(y) === 0, `cos(3 * Math.PI / 2) should be 0, but instead is ${y}!`)

  let hasFailed

  try {
    hasFailed = false
    cos("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos("foo") should have failed!`)

  try {
    hasFailed = false
    cos(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(true) should have failed!`)

  try {
    hasFailed = false
    cos({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos({}) should have failed!`)

  try {
    hasFailed = false
    cos([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    cos(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    cos(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(foo) should have failed!`)

  console.log("All tests passed!")
}

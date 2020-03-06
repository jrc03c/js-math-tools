let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let mean = require("./mean.js")

function covariance(x, y){
  assert(!isUndefined(x) && !isUndefined(y), "You must pass two equally-sized one-dimensional arrays into the `covariance` function!")

  assert(isArray(x) && isArray(y), "The `covariance` function only works on two equally-sized one-dimensional arrays of numbers!")

  x.concat(y).forEach(function(v){
    assert(isNumber(v), "The `covariance` function only works on two equally-sized one-dimensional arrays of numbers!")
  })

  assert(x.length === y.length, "The two one-dimensional arrays passed into the `covariance` function must be of equal length!")

  let mx = mean(x)
  let my = mean(y)
  let out = 0
  for (let i=0; i<x.length; i++) out += (x[i] - mx) * (y[i] - my)
  return out / x.length
}

module.exports = covariance

// tests
if (!module.parent){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let chop = require("./chop.js")

  let x = [2, 3, 4]
  let y = [1, 1, 1]
  let cv = covariance(x, y)
  assert(cv === 0, `covariance([2, 3, 4], [1, 1, 1]) should be 0, but instead was ${cv}!`)

  x = normal([10000])
  y = normal([10000])
  cv = covariance(x, y)
  assert(abs(cv) < 0.05, `covariance(normal([10000]), normal(10000)) should be approximately 0, but instead is ${cv}!`)

  y = covariance(x, x)
  assert(y > 0.95, `covariance(x, x) should be approximately 1, but instead is ${y}!`)

  assert(isNaN(covariance([], [])), `covariance([], []) should return NaN!`)

  let hasFailed

  try {
    hasFailed = false
    covariance([1, 2, 3], [1, 2, 3, 4])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([1, 2, 3], [1, 2, 3, 4]) should have failed!`)

  try {
    hasFailed = false
    covariance(["foo", "bar", "baz"], ["a", "b", "c"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance(["foo", "bar", "baz"], ["a", "b", "c"]) should have failed!`)

  try {
    let foo
    hasFailed = false
    covariance([foo], [foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([foo], [foo]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    covariance([fn], [fn])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([fn], [fn]) should have failed!`)

  try {
    hasFailed = false
    covariance({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance({}, {}) should have failed!`)

  console.log("All tests passed!")
}

let assert = require("./assert.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let covariance = require("./covariance.js")
let std = require("./std.js")
let dropNaNPairwise = require("./drop-nan-pairwise.js")
let shape = require("./shape.js")

function correl(x, y){
  assert(!isUndefined(x) && !isUndefined(y), "You must pass two equally-sized one-dimensional arrays into the `correl` function!")
  assert(isArray(x) && isArray(y), "The `correl` function works on exactly two one-dimensional arrays!")
  assert(shape(x).length === 1 && shape(y).length === 1, "The `correl` function works on exactly two one-dimensional arrays!")
  assert(x.length === y.length, "The two one-dimensional arrays passed into the `correl` function must have the same length!")

  let results = dropNaNPairwise(x, y)
  let xTemp = results.a
  let yTemp = results.b
  if (xTemp.length === 0 || yTemp.length === 0) return undefined
  return covariance(xTemp, yTemp) / (std(xTemp) * std(yTemp))
}

module.exports = correl

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let add = require("./add.js")
  let scale = require("./scale.js")

  let x = normal([10000])
  let y = normal([10000])
  let r = correl(x, y)

  assert(abs(r) < 0.05, `correl(normal([10000]), normal([10000])) should be approximately 0, but instead was ${r}!`)

  y = add(x, scale(0.01, normal([10000])))
  r = correl(x, y)
  assert(r > 0.95, `correl(x, x + 0.01 * normal([10000])) should be approximately 1, but instead was ${r}!`)

  y = add(scale(-1, x), scale(0.01, normal([10000])))
  r = correl(x, y)
  assert(r < -0.95, `correl(x, -x + 0.01 * normal([10000])) should be approximately -1, but instead was ${r}!`)

  let hasFailed

  try {
    hasFailed = false
    correl(1, 2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(1, 2) should have failed!`)

  try {
    hasFailed = false
    correl(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(true, false) should have failed!`)

  try {
    hasFailed = false
    correl([], {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([], {}) should have failed!`)

  try {
    hasFailed = false
    correl("foo", "bar")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl("foo", "bar") should have failed!`)

  try {
    hasFailed = false
    correl([2, 3, 4], ["a", "b", "c"])
  } catch(e){
    hasFailed = true
  }

  assert(!hasFailed, `correl([2, 3, 4], ["a", "b", "c"]) should have failed!`)

  try {
    hasFailed = false
    correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]]) should have failed!`)

  let fn = () => {}

  try {
    hasFailed = false
    correl(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    correl(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(foo, foo) should have failed!`)

  assert(isNaN(correl([2, 3, 4], [1, 1, 1])), `correl([2, 3, 4], [1, 1, 1]) should be NaN!`)

  console.log("All tests passed!")
}

let assert = require("./assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let mean = require("./mean.js")
let dropNaNPairwise = require("./drop-nan-pairwise.js")

function covariance(x, y) {
  try {
    let [xTemp, yTemp] = dropNaNPairwise(x, y)
    if (xTemp.length === 0 || yTemp.length === 0) return NaN

    let mx = mean(xTemp)
    let my = mean(yTemp)
    let out = 0
    for (let i = 0; i < xTemp.length; i++)
      out += (xTemp[i] - mx) * (yTemp[i] - my)
    return out / xTemp.length
  } catch (e) {
    return NaN
  }
}

module.exports = covariance

// tests
if (!module.parent && typeof window === "undefined") {
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let chop = require("./chop.js")

  let x = [2, 3, 4]
  let y = [1, 1, 1]
  let cv = covariance(x, y)
  assert(
    cv === 0,
    `covariance([2, 3, 4], [1, 1, 1]) should be 0, but instead was ${cv}!`
  )

  x = normal([10000])
  y = normal([10000])
  cv = covariance(x, y)
  assert(
    abs(cv) < 0.05,
    `covariance(normal([10000]), normal(10000)) should be approximately 0, but instead is ${cv}!`
  )

  y = covariance(x, x)
  assert(
    y > 0.95,
    `covariance(x, x) should be approximately 1, but instead is ${y}!`
  )

  assert(isNaN(covariance([], [])), `covariance([], []) should be NaN!`)

  let hasFailed

  try {
    hasFailed = false
    covariance([1, 2, 3], [1, 2, 3, 4])
  } catch (e) {
    hasFailed = true
  }

  assert(hasFailed, `covariance([1, 2, 3], [1, 2, 3, 4]) should have failed!`)

  try {
    hasFailed = false
    covariance(["foo", "bar", "baz"], ["a", "b", "c"])
  } catch (e) {
    hasFailed = true
  }

  assert(
    !hasFailed,
    `covariance(["foo", "bar", "baz"], ["a", "b", "c"]) should have failed!`
  )

  try {
    let foo
    hasFailed = false
    covariance([foo], [foo])
  } catch (e) {
    hasFailed = true
  }

  assert(!hasFailed, `covariance([foo], [foo]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    covariance([fn], [fn])
  } catch (e) {
    hasFailed = true
  }

  assert(!hasFailed, `covariance([fn], [fn]) should have failed!`)

  try {
    hasFailed = false
    covariance({}, {})
  } catch (e) {
    hasFailed = true
  }

  assert(hasFailed, `covariance({}, {}) should have failed!`)

  console.log("All tests passed!")
}

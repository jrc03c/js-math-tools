const assert = require("./assert.js")
const covariance = require("./covariance.js")
const isArray = require("./is-array.js")
const isSeries = require("./is-series.js")
const shape = require("./shape.js")
const std = require("./std.js")

function correl(x, y) {
  if (isSeries(x)) {
    return correl(x.values, y)
  }

  if (isSeries(y)) {
    return correl(x, y.values)
  }

  assert(
    isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
    "The `correl` function only works on 1-dimensional arrays and Series!"
  )

  assert(
    x.length === y.length,
    "The two arrays or Series passed into the `correl` function must have the same length!"
  )

  try {
    return covariance(x, y) / (std(x) * std(y))
  } catch (e) {
    return NaN
  }
}

module.exports = correl

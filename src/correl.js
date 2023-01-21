const assert = require("./assert")
const covariance = require("./covariance")
const isArray = require("./is-array")
const isSeries = require("./is-series")
const shape = require("./shape")
const std = require("./std")

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

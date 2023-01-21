const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function min(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return min(arr.values)
  }

  assert(
    isArray(arr),
    "The `min` function only works on arrays, Series, and DataFrames!"
  )

  try {
    return Math.min(...flatten(arr))
  } catch (e) {
    return NaN
  }
}

module.exports = min

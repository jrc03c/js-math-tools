const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")
const sqrt = require("./sqrt.js")
const variance = require("./variance.js")

function std(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return std(arr.values)
  }

  assert(
    isArray(arr),
    "The `std` function only works on arrays, Series, and DataFrames!"
  )

  try {
    return sqrt(variance(arr))
  } catch (e) {
    return NaN
  }
}

module.exports = std

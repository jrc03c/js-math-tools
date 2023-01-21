const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const sqrt = require("./sqrt")
const variance = require("./variance")

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

const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")

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

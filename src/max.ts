const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")

function max(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return max(arr.values)
  }

  assert(
    isArray(arr),
    "The `max` function only works on arrays, Series, and DataFrames!"
  )

  try {
    return Math.max(...flatten(arr))
  } catch (e) {
    return NaN
  }
}

module.exports = max

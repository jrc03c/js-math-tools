const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")

function sum(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return sum(arr.values)
  }

  assert(
    isArray(arr),
    "The `sum` function only works on arrays, Series, and DataFrames!"
  )

  try {
    if (arr.length === 0) return NaN
    return flatten(arr).reduce((a, b) => a + b, 0)
  } catch (e) {
    return NaN
  }
}

module.exports = sum

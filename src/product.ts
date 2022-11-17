const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")

function product(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return product(arr.values)
  }

  assert(
    isArray(arr),
    "The `product` function only works on arrays, Series, and DataFrames!"
  )

  try {
    if (arr.length === 0) return NaN
    return flatten(arr).reduce((a, b) => a * b, 1)
  } catch (e) {
    return NaN
  }
}

module.exports = product

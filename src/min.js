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
    arr = flatten(arr)
    let lowest = Infinity

    for (const v of arr) {
      if (v < lowest) {
        lowest = v
      }
    }

    return lowest
  } catch (e) {
    return NaN
  }
}

module.exports = min

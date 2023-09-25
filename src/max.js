const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function max(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return max(arr.values)
  }

  assert(
    isArray(arr),
    "The `max` function only works on arrays, Series, and DataFrames!"
  )

  try {
    arr = flatten(arr)
    let highest = -Infinity

    for (const v of arr) {
      if (v > highest) {
        highest = v
      }
    }

    return highest
  } catch (e) {
    return NaN
  }
}

module.exports = max

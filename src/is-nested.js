const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function isNested(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return isNested(x.values)
  }

  assert(
    isArray(x),
    "The `isNested` function only works on arrays, Series, and DataFrames!"
  )

  for (let i = 0; i < x.length; i++) {
    if (isArray(x[i])) {
      return true
    }
  }

  return false
}

module.exports = isNested

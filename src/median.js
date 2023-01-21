const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const sort = require("./sort")

function median(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return median(arr.values)
  }

  assert(
    isArray(arr),
    "The `median` function only works on arrays, Series, and DataFrames!"
  )

  try {
    const temp = sort(flatten(arr))

    if (temp.length === 0) {
      return NaN
    } else if (temp.length % 2 === 0) {
      return (temp[temp.length / 2 - 1] + temp[temp.length / 2]) / 2
    } else {
      return temp[parseInt(temp.length / 2)]
    }
  } catch (e) {
    return NaN
  }
}

module.exports = median

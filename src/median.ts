const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")
const sort = require("./sort.js")

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

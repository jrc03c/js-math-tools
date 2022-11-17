const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")

function reverse(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    const out = arr.copy()
    out.values = reverse(out.values)
    out.index = reverse(out.index)
    return out
  }

  assert(
    isArray(arr),
    "The `reverse` function only works on arrays, Series, and DataFrames!"
  )

  const out = []
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i])
  return out
}

module.exports = reverse

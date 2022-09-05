const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isEqual = require("./is-equal.js")
const isSeries = require("./is-series.js")
const set = require("./set.js")

function diff(a, b) {
  if (isDataFrame(a) || isSeries(a)) {
    return diff(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return diff(a, b.values)
  }

  assert(
    isArray(a) && isArray(b),
    "The `diff` function only works on arrays, Series, and DataFrames!"
  )

  const aTemp = set(a)
  const bTemp = set(b)
  const out = []

  aTemp.forEach(item => {
    if (bTemp.findIndex(other => isEqual(other, item)) < 0) {
      out.push(item)
    }
  })

  return out
}

module.exports = diff

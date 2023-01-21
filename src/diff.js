const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isEqual = require("./is-equal")
const isSeries = require("./is-series")
const set = require("./set")

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

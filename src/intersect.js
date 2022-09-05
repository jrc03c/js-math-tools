const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isEqual = require("./is-equal.js")
const isSeries = require("./is-series.js")
const isUndefined = require("./is-undefined.js")

function intersect(a, b) {
  if (isDataFrame(a) || isSeries(a)) {
    return intersect(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return intersect(a, b.values)
  }

  assert(
    isArray(a) && isArray(b),
    "The `intersect` function only works on arrays, Series, and DataFrames!"
  )

  const aTemp = flatten(a)
  const bTemp = flatten(b)
  const out = []

  aTemp.forEach(item => {
    const equivalent = bTemp.find(other => isEqual(other, item))

    if (!isUndefined(equivalent)) {
      out.push(item)
    }
  })

  return out
}

module.exports = intersect

const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isEqual = require("./is-equal.js")
const isSeries = require("./is-series.js")
const isUndefined = require("./is-undefined.js")
const shape = require("./shape.js")

function dropMissingPairwise(a, b) {
  if (isDataFrame(a) || isSeries(a)) {
    return dropMissingPairwise(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return dropMissingPairwise(a, b.values)
  }

  assert(
    isArray(a) && isArray(b),
    "The `dropMissingPairwise` function only works on arrays, Series, and DataFrames!"
  )

  assert(
    isEqual(shape(a), shape(b)),
    "The two arrays, Series, and/or DataFrames passed into the `dropMissingPairwise` function must have the same shape!"
  )

  const aOut = []
  const bOut = []

  for (let i = 0; i < a.length; i++) {
    try {
      const [aChildren, bChildren] = dropMissingPairwise(a[i], b[i])
      aOut.push(aChildren)
      bOut.push(bChildren)
    } catch (e) {
      if (!isUndefined(a[i]) && !isUndefined(b[i])) {
        aOut.push(a[i])
        bOut.push(b[i])
      }
    }
  }

  return [aOut, bOut]
}

module.exports = dropMissingPairwise

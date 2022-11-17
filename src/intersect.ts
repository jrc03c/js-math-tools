const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isEqual = require("./is-equal.js")
const isSeries = require("./is-series.js")
const set = require("./set.js")

function intersect() {
  const arrays = Object.values(arguments).map(x => {
    if (isDataFrame(x) || isSeries(x)) {
      return set(x.values)
    }

    assert(
      isArray(x),
      "The `intersect` function only works on arrays, Series, and DataFrames!"
    )

    return set(x)
  })

  const all = set(arrays)

  return all.filter(v => {
    return arrays.every(arr => arr.findIndex(other => isEqual(other, v)) > -1)
  })
}

module.exports = intersect

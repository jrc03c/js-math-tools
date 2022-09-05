const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")
const isUndefined = require("./is-undefined.js")

function dropMissing(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return x.dropMissing(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(x),
    "The `dropMissing` function only works on arrays, Series, and DataFrames!"
  )

  const out = []

  x.forEach(v => {
    try {
      return out.push(dropMissing(v))
    } catch (e) {
      if (!isUndefined(v)) {
        out.push(v)
      }
    }
  })

  return out
}

module.exports = dropMissing

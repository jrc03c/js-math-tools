const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const isUndefined = require("./is-undefined")

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

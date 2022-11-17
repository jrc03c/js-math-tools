const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")

function mean(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return mean(arr.values)
  }

  assert(
    isArray(arr),
    "The `mean` function only works on arrays, Series, and DataFrames!"
  )

  try {
    const temp = flatten(arr)
    let out = 0

    temp.forEach(v => {
      out += v
    })

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = mean

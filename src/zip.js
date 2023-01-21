const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const isUndefined = require("./is-undefined")
const max = require("./max")
const range = require("./range")

function zip() {
  const out = []

  const arrays = Object.values(arguments).map(arr => {
    if (isDataFrame(arr) || isSeries(arr)) {
      arr = arr.values
    }

    assert(
      isArray(arr),
      "The `zip` function only works on arrays, Series, and DataFrames!"
    )

    return arr
  })

  range(0, max(arrays.map(arr => arr.length))).forEach(i => {
    const row = []

    arrays.forEach(arr => {
      const value = arr[i]
      row.push(isUndefined(value) ? undefined : value)
    })

    out.push(row)
  })

  return out
}

module.exports = zip

const assert = require("./assert.js")
const copy = require("./copy.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")

function flatten(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return flatten(arr.values)
  }

  assert(
    isArray(arr),
    "The `flatten` function only works on arrays, Series, and DataFrames!"
  )

  function helper(arr) {
    let out = []

    copy(arr).forEach(child => {
      if (isArray(child)) {
        out = out.concat(helper(child))
      } else {
        out.push(child)
      }
    })

    return out
  }

  return helper(arr)
}

module.exports = flatten

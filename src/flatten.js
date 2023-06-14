const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

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

    arr.forEach(child => {
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

const assert = require("./assert")
const count = require("./count")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const set = require("./set")
const sort = require("./sort")

function mode(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return mode(arr.values)
  }

  assert(
    isArray(arr),
    "The `mode` function only works on arrays, Series, and DataFrames!"
  )

  try {
    if (arr.length === 0) return NaN

    const temp = flatten(arr)
    if (temp.length === 0) return NaN

    const counts = {}
    const tempSet = set(temp)

    tempSet.forEach(item => {
      counts[item] = count(temp, item)
    })

    const sortedTempSet = sort(tempSet, (a, b) => counts[b] - counts[a])
    const mostCountedItem = sortedTempSet[0]

    const out = sort(
      sortedTempSet.filter(item => counts[item] === counts[mostCountedItem])
    )

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = mode

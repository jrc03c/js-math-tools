const assert = require("./assert.js")
const count = require("./count.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")
const set = require("./set.js")
const sort = require("./sort.js")

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

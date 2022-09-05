const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isNumber = require("./is-number.js")
const isSeries = require("./is-series.js")

function combinations(arr, r) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return combinations(arr.values, r)
  }

  assert(
    isArray(arr),
    "The `combinations` function only works on arrays, Series, and DataFrames!"
  )
  assert(isNumber(r), "`r` must be a whole number!")
  arr = flatten(arr)

  if (r > arr.length) {
    return [arr]
  }

  if (r <= 0) {
    return [[]]
  }

  assert(r === parseInt(r), "`r` must be a whole number!")

  if (arr.length < 2) return arr
  const out = []

  arr.forEach((item, i) => {
    const after = arr.slice(i + 1)
    if (after.length < r - 1) return
    const children = combinations(after, r - 1)

    children.forEach(child => {
      out.push([item].concat(child))
    })
  })

  return out
}

module.exports = combinations

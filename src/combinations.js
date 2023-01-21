const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")

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

const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const isUndefined = require("./is-undefined")

function permutations(arr, r) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return permutations(arr.values, r)
  }

  assert(
    isArray(arr),
    "The `permutations` function only works on arrays, Series, and DataFrames!"
  )
  if (isUndefined(r)) r = arr.length
  assert(isNumber(r), "`r` must be a whole number!")
  arr = flatten(arr)

  if (r > arr.length) {
    return permutations(arr)
  }

  if (r <= 0) {
    return [[]]
  }

  assert(r === parseInt(r), "`r` must be a whole number!")

  if (arr.length < 2) return arr
  const out = []

  arr.forEach((item, i) => {
    const before = arr.slice(0, i)
    const after = arr.slice(i + 1)
    const others = before.concat(after)
    const children = permutations(others, r - 1)

    children.forEach(child => {
      out.push([item].concat(child))
    })
  })

  return out
}

module.exports = permutations

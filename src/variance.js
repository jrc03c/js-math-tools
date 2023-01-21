const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const mean = require("./mean")

function variance(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return variance(arr.values)
  }

  assert(
    isArray(arr),
    "The `variance` function only works on arrays, Series, and DataFrames!"
  )

  try {
    const temp = flatten(arr)
    const m = mean(temp)
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      if (!isNumber(temp[i])) return NaN
      out += (temp[i] - m) * (temp[i] - m)
    }

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = variance

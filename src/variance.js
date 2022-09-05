const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isNumber = require("./is-number.js")
const isSeries = require("./is-series.js")
const mean = require("./mean.js")

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

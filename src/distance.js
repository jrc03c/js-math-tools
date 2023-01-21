const abs = require("./abs")
const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isEqual = require("./is-equal")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const pow = require("./pow")
const shape = require("./shape")
const sqrt = require("./sqrt")
const subtract = require("./subtract")
const sum = require("./sum")

function distance(a, b) {
  if (isNumber(a) && isNumber(b)) {
    return abs(a - b)
  }

  if (isDataFrame(a) || isSeries(a)) {
    return distance(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return distance(a, b.values)
  }

  if (isArray(a) && isArray(b)) {
    assert(
      isEqual(shape(a), shape(b)),
      "If passing two arrays, Series, or DataFrames into the `distance` function, then those objects must have the same shape!"
    )
  }

  try {
    return sqrt(sum(pow(subtract(a, b), 2)))
  } catch (e) {
    return NaN
  }
}

module.exports = distance

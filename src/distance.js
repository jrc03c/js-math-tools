const abs = require("./abs.js")
const isDataFrame = require("./is-dataframe.js")
const isNumber = require("./is-number.js")
const isSeries = require("./is-series.js")
const pow = require("./pow.js")
const sqrt = require("./sqrt.js")
const subtract = require("./subtract.js")
const sum = require("./sum.js")

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

  try {
    return sqrt(sum(pow(subtract(a, b), 2)))
  } catch (e) {
    return NaN
  }
}

module.exports = distance

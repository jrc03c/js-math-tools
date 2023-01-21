const assert = require("./assert")
const indexOf = require("./index-of")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const max = require("./max")

function argmax(x) {
  if (isDataFrame(x)) {
    const index = argmax(x.values)
    return [x.index[index[0]], x.columns[index[1]]]
  }

  if (isSeries(x)) {
    const index = argmax(x.values)
    return [x.index[index]]
  }

  assert(
    isArray(x),
    "The `argmax` function only works on arrays, Series, and DataFrames!"
  )

  try {
    const out = indexOf(x, max(x))

    if (out) {
      if (out.length === 0) {
        return undefined
      } else if (out.length === 1) {
        return out[0]
      } else {
        return out
      }
    } else {
      return undefined
    }
  } catch (e) {
    return undefined
  }
}

module.exports = argmax

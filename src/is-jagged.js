const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function isJagged(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return isJagged(x.values)
  }

  assert(
    isArray(x),
    "The `isJagged` function only works on arrays, Series, and DataFrames!"
  )

  let childArrayCount = 0
  let firstChildArrayLength = null

  for (let i = 0; i < x.length; i++) {
    if (isArray(x[i])) {
      childArrayCount++

      if (isJagged(x[i])) {
        return true
      }

      if (firstChildArrayLength === null) {
        firstChildArrayLength = x[i].length
      } else if (x[i].length !== firstChildArrayLength) {
        return true
      }
    }
  }

  if (childArrayCount > 0 && childArrayCount < x.length) {
    return true
  }

  return false
}

module.exports = isJagged

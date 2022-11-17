const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isEqual = require("./is-equal.js")
const isFunction = require("./is-function.js")
const isSeries = require("./is-series.js")
const set = require("./set.js")

function count(arr, matcher) {
  if (isDataFrame(arr) || isSeries(arr)) {
    if (arguments.length > 1) {
      return count(arr.values, matcher)
    } else {
      return count(arr.values, arr.values)
    }
  }

  assert(
    isArray(arr),
    "The first argument to the `count` function must be an array, Series, or DataFrame!"
  )

  // NOTE: This currently flattens the array that's passed in, which means that it's not possible to count occurrences of arrays within arrays! I'm not sure whether this is desirable behavior or not, so I'm just making a note of it for now.
  if (isFunction(matcher)) {
    return flatten(arr).filter(item => matcher(item)).length
  } else if (isArray(matcher)) {
    const temp = flatten(arr)

    return set(matcher).map(item => {
      return {
        item,
        count: temp.filter(v => isEqual(v, item)).length,
      }
    })
  } else if (arguments.length > 1) {
    return flatten(arr).filter(other => isEqual(other, matcher)).length
  } else {
    return count(arr, arr)
  }
}

module.exports = count

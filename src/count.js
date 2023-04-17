const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isEqual = require("./is-equal")
const isFunction = require("./is-function")
const isSeries = require("./is-series")
const set = require("./set")

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
    return flatten(arr).filter(value => matcher(value)).length
  } else if (isArray(matcher)) {
    const temp = flatten(arr)

    return set(matcher).map(value => {
      return {
        value,
        count: temp.filter(v => isEqual(v, value)).length,
      }
    })
  } else if (arguments.length > 1) {
    return flatten(arr).filter(other => isEqual(other, matcher)).length
  } else {
    return count(arr, arr)
  }
}

module.exports = count

const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isFunction = require("./is-function")
const isNumber = require("./is-number")
const isObject = require("./is-object")
const isSeries = require("./is-series")

function indexOf(x, fn) {
  if (isDataFrame(x)) {
    const index = indexOf(x.values, fn)

    if (
      index.length > 0 &&
      isNumber(index[0]) &&
      index[0] >= 0 &&
      index[0] < x.index.length
    ) {
      index[0] = x.index[index[0]]
    }

    if (
      index.length > 1 &&
      isNumber(index[1]) &&
      index[1] >= 0 &&
      index[1] < x.columns.length
    ) {
      index[1] = x.columns[index[1]]
    }

    return index
  }

  if (isSeries(x)) {
    const index = indexOf(x.values, fn)

    if (
      index.length > 0 &&
      isNumber(index[0]) &&
      index[0] >= 0 &&
      index[0] < x.index.length
    ) {
      index[0] = x.index[index[0]]
    }

    return index
  }

  assert(
    isObject(x) || isArray(x),
    "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `indexOf` function!"
  )

  if (!isFunction(fn)) {
    const value = fn
    fn = v => v === value
  }

  function helper(x, fn, checked) {
    checked = checked || []

    if (checked.indexOf(x) > -1) {
      return null
    }

    if (isObject(x)) {
      checked.push(x)
      const keys = Object.keys(x).concat(Object.getOwnPropertySymbols(x))

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = x[key]

        if (fn(value)) {
          return [key]
        }

        const results = helper(value, fn, checked)

        if (results && results.length > 0) {
          return [key].concat(results)
        }
      }
    } else if (isArray(x)) {
      checked.push(x)

      for (let i = 0; i < x.length; i++) {
        const value = x[i]

        if (fn(value)) {
          return [i]
        }

        const results = helper(value, fn, checked)

        if (results && results.length > 0) {
          return [i].concat(results)
        }
      }
    } else {
      if (fn(x)) {
        return []
      }
    }

    return null
  }

  function safeFn(v) {
    try {
      return fn(v)
    } catch (e) {
      return false
    }
  }

  const paths = helper(x, safeFn)

  if (paths && paths.length > 0) {
    return paths
  } else {
    return null
  }
}

module.exports = indexOf

const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isFunction = require("./is-function")
const isObject = require("./is-object")
const isSeries = require("./is-series")

function findAll(x, fn) {
  if (isDataFrame(x)) {
    return findAll(flatten(x.values), fn)
  }

  if (isSeries(x)) {
    return findAll(x.values, fn)
  }

  assert(
    isObject(x) || isArray(x),
    "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `findAll` function!"
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
      const out = []

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = x[key]
        let alreadyStoredThisValue = false

        if (fn(value)) {
          out.push(value)
          alreadyStoredThisValue = true
        }

        const results = helper(value, fn, checked)

        if (results && results.length > 0) {
          results
            .slice(alreadyStoredThisValue ? 1 : 0)
            .forEach(r => out.push(r))
        }
      }

      return out
    } else if (isArray(x)) {
      checked.push(x)
      const out = []

      for (let i = 0; i < x.length; i++) {
        const value = x[i]
        let alreadyStoredThisValue = false

        if (fn(value)) {
          out.push(value)
          alreadyStoredThisValue = true
        }

        const results = helper(value, fn, checked)

        if (results && results.length > 0) {
          results
            .slice(alreadyStoredThisValue ? 1 : 0)
            .forEach(r => out.push(r))
        }
      }

      return out
    } else {
      if (fn(x)) {
        return [x]
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

  const results = helper(x, safeFn)

  if (results && results.length > 0) {
    return results
  } else {
    return null
  }
}

module.exports = findAll

const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isFunction = require("./is-function.js")
const isObject = require("./is-object.js")

function indexOf(x, fn) {
  assert(
    isObject(x) || isArray(x),
    "You must pass (1) an object or array and (2) a function or value into the `indexOf` function!"
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
      const keys = Object.keys(x)

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

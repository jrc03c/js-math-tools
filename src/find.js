const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isFunction = require("./is-function.js")
const isObject = require("./is-object.js")

function find(x, fn) {
  assert(
    isObject(x) || isArray(x),
    "You must pass (1) an object or array and (2) a function or value into the `find` function!"
  )

  if (!isFunction(fn)) {
    value = fn
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
          return value
        }

        const result = helper(value, fn, checked)

        if (result) {
          return result
        }
      }
    } else if (isArray(x)) {
      checked.push(x)

      for (let i = 0; i < x.length; i++) {
        const value = x[i]

        if (fn(value)) {
          return value
        }

        const result = helper(value, fn, checked)

        if (result) {
          return result
        }
      }
    } else {
      if (fn(x)) {
        return x
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

  return helper(x, safeFn)
}

module.exports = find

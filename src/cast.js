const isArray = require("./is-array")
const isBoolean = require("./is-boolean")
const isObject = require("./is-object")
const isUndefined = require("./is-undefined")
const nullValues = require("./helpers/null-values")

function cast(value, type) {
  if (isArray(value)) {
    return value.map(v => cast(v, type))
  }

  if (type === "null") {
    return null
  }

  if (type === "number") {
    if (isUndefined(value)) {
      return NaN
    }

    const out = parseFloat(value)
    if (isNaN(out)) return NaN
    return out
  }

  if (type === "boolean") {
    if (isBoolean(value)) {
      return value
    }

    try {
      const vBool = (
        typeof value === "object"
          ? value.toString() === "null"
            ? "false"
            : JSON.stringify(value)
          : value.toString()
      )
        .trim()
        .toLowerCase()

      if (vBool === "true" || vBool === "yes" || vBool === "y") {
        return true
      }

      if (vBool === "false" || vBool === "no" || vBool === "n") {
        return false
      }

      return null
    } catch (e) {
      return null
    }
  }

  if (type === "date") {
    if (value instanceof Date) {
      return value
    }

    const out = new Date(value)
    if (out.toString() === "Invalid Date") return null
    return out
  }

  if (type === "object") {
    if (isObject(value)) {
      return value
    }

    // note: don't return arrays!
    try {
      const out = JSON.parse(value)

      if (isArray(out)) {
        return out.map(v => cast(v, type))
      } else {
        return out
      }
    } catch (e) {
      return null
    }
  }

  if (type === "string") {
    if (isUndefined(value)) {
      return null
    }

    const valueString = (() => {
      if (typeof value === "object") {
        if (value === null) {
          return "null"
        } else {
          return JSON.stringify(value)
        }
      } else {
        return value.toString()
      }
    })()

    if (nullValues.indexOf(valueString.trim().toLowerCase()) > -1) {
      return null
    }

    return valueString
  }
}

module.exports = cast

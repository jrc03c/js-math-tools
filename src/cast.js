const isArray = require("./is-array")
const isBoolean = require("./is-boolean")
const isDataFrame = require("./is-dataframe")
const isDate = require("./is-date")
const isEqual = require("./is-equal")
const isNumber = require("./is-number")
const isObject = require("./is-object")
const isSeries = require("./is-series")
const isUndefined = require("./is-undefined")

function cast(value, type) {
  if (isDataFrame(value) || isSeries(value)) {
    return value.apply(item => cast(item, type))
  }

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

    const booleanValue = cast(value, "boolean")

    if (isBoolean(booleanValue)) {
      return booleanValue ? 1 : 0
    }

    try {
      JSON.parse(value)
    } catch (e) {
      const dateValue = cast(value, "date")

      if (isDate(dateValue)) {
        return dateValue.getTime()
      }
    }

    const out = parseFloat(value)
    if (isNaN(out)) return NaN
    return out
  }

  if (type === "boolean") {
    if (isBoolean(value)) {
      return value
    }

    if (isNumber(value)) {
      if (value === 0) {
        return false
      }

      if (value === 1) {
        return true
      }

      return null
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
    if (isDate(value)) {
      return value
    }

    if (isUndefined(value)) {
      return null
    }

    const valueFloat = parseFloat(value)

    if (!isNaN(valueFloat)) {
      const out = new Date(value)
      if (!isDate(out)) return null
      return out
    }

    const valueDate = Date.parse(value)

    if (!isNaN(valueDate)) {
      return new Date(valueDate)
    }

    return null
  }

  if (type === "object") {
    if (isObject(value)) {
      return value
    }

    const booleanValue = cast(value, "boolean")

    if (isBoolean(booleanValue)) {
      return null
    }

    try {
      const numberValue = cast(value, "number")

      if (isNumber(numberValue)) {
        JSON.parse(value)
        return null
      }
    } catch (e) {}

    const dateValue = cast(value, "date")

    if (dateValue) {
      return dateValue
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
      if (isEqual(value, undefined)) {
        return "undefined"
      }

      return "null"
    }

    if (value instanceof Date) {
      return value.toJSON()
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

    // if (nullValues.indexOf(valueString.trim().toLowerCase()) > -1) {
    //   return null
    // }

    return valueString
  }
}

module.exports = cast

const isArray = require("./is-array")
const nullValues = require("./helpers/null-values")

function cast(value, type) {
  if (value === undefined) {
    value = "undefined"
  }

  if (type === "null") {
    return null
  }

  if (type === "number") {
    const out = parseFloat(value)
    if (isNaN(out)) return NaN
    return out
  }

  if (type === "boolean") {
    try {
      const vBool = value.trim().toLowerCase()

      if (vBool === "true" || vBool === "yes") {
        return true
      }

      if (vBool === "false" || vBool === "no") {
        return false
      }
    } catch (e) {}

    return null
  }

  if (type === "date") {
    const out = new Date(value)
    if (out.toString() === "Invalid Date") return null
    return out
  }

  if (type === "object") {
    // note: don't return arrays!
    try {
      const out = JSON.parse(value)
      if (isArray(out)) return null
      return out
    } catch (e) {
      return null
    }
  }

  if (type === "string") {
    try {
      if (nullValues.indexOf(value.trim().toLowerCase()) > -1) return null
    } catch (e) {
      return null
    }

    return value
  }
}

module.exports = cast

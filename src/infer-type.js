const apply = require("./apply")
const assert = require("./assert")
const booleanValues = require("./helpers/boolean-values")
const cast = require("./cast")
const count = require("./count")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const isString = require("./is-string")
const nullValues = require("./helpers/null-values")

function inferType(arr) {
  if (isDataFrame(arr)) {
    const out = arr.copy()
    const results = inferType(arr.values)
    out.values = results.values
    return { type: results.type, values: out }
  }

  if (isSeries(arr)) {
    const out = arr.copy()
    const results = inferType(arr.values)
    out.values = results.values
    return { type: results.type, values: out }
  }

  assert(
    isArray(arr),
    "The `inferType` function only works on arrays, Series, and DataFrames!"
  )

  // possible types:
  // - number
  // - boolean
  // - date
  // - object
  // - null
  // - string
  // note: do NOT return arrays!
  const types = flatten(arr).map(v => {
    if (v === undefined) return "null"

    if (!isString(v)) {
      v = JSON.stringify(v)
    }

    const vLower = v.toLowerCase()
    const vLowerTrimmed = vLower.trim()

    // null
    if (nullValues.indexOf(vLowerTrimmed) > -1) {
      return "null"
    }

    // boolean
    if (booleanValues.indexOf(vLowerTrimmed) > -1) {
      return "boolean"
    }

    try {
      const vParsed = JSON.parse(v)

      // number
      if (isNumber(vParsed)) {
        return "number"
      }

      // object
      if (typeof vParsed === "object") {
        if (isArray(vParsed)) return "string"
        return "object"
      }

      return "string"
    } catch (e) {
      // date
      const vDate = new Date(v)

      if (vDate.toString() !== "Invalid Date") {
        return "date"
      }

      return "string"
    }
  })

  const counts = count(types).sort((a, b) => b.count - a.count)
  const primaryType = counts[0].item
  return { type: primaryType, values: apply(arr, v => cast(v, primaryType)) }
}

module.exports = inferType

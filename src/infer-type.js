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

  // NOTE: I don't understand why this block is necessary since I already infer
  // date values in the loop below. But if I leave this out, the tests fail.
  // However, the tests *pass* when I run them outside the context of Jest,
  // which leads me to believe that there's a bug with Jest. I'll have to
  // investigate further.
  if (arr instanceof Date) {
    return { type: "date", value: arr }
  }

  if (!isArray(arr)) {
    const out = inferType([arr])
    out.value = out.values[0]
    delete out.values
    return out
  }

  assert(
    isArray(arr),
    "The `inferType` function only works on arrays, Series, and DataFrames!"
  )

  // possible types:
  // - boolean
  // - date
  // - null
  // - number
  // - object
  // - string
  // note: do NOT return arrays!
  const types = flatten(arr).map(v => {
    if (v === undefined) return "null"

    if (v instanceof Date) {
      return "date"
    }

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

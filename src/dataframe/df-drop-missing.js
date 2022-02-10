const assert = require("../assert.js")
const isWholeNumber = require("./is-whole-number.js")
const isUndefined = require("../is-undefined.js")
const isString = require("../is-string.js")
const isSeries = require("./is-series.js")
const shape = require("../shape.js")

function dfDropMissing(DataFrame, df, axis, condition, threshold) {
  axis = axis || 0

  assert(
    axis === 0 || axis === 1,
    "The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1."
  )

  threshold = threshold || 0

  assert(
    isWholeNumber(threshold),
    "The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values)."
  )

  condition = threshold > 0 ? "none" : condition || "any"

  assert(
    condition === "any" || condition === "all" || condition === "none",
    "The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped)."
  )

  function helper(values) {
    if (threshold > 0) {
      let count = 0

      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (isUndefined(value)) count++
        if (count >= threshold) return []
      }
    } else if (condition === "any") {
      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (isUndefined(value)) return []
      }
    } else if (condition === "all") {
      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        if (!isUndefined(value)) return values
      }

      return []
    }

    return values
  }

  let out = df.copy()
  const tempID = Math.random().toString()

  if (axis === 0) {
    out = out.assign(tempID, out.index)

    const newValues = out.values.map(helper).filter(row => row.length > 0)

    if (shape(newValues).length < 2) return new DataFrame()

    out.values = newValues

    let newIndex = out.get(null, tempID)
    if (isUndefined(newIndex)) return new DataFrame()
    if (isString(newIndex)) newIndex = [newIndex]
    if (isSeries(newIndex)) newIndex = newIndex.values
    out.index = newIndex
    out = out.drop(null, tempID)
  } else if (axis === 1) {
    out = out.transpose()
    out = out.assign(tempID, out.index)

    const newValues = out.values.map(helper).filter(col => col.length > 0)

    if (shape(newValues).length < 2) return new DataFrame()

    out.values = newValues

    let newIndex = out.get(null, tempID)
    if (isUndefined(newIndex)) return new DataFrame()
    if (isString(newIndex)) newIndex = [newIndex]
    if (isSeries(newIndex)) newIndex = newIndex.values
    out.index = newIndex
    out = out.drop(null, tempID)
    out = out.transpose()
  }

  return out
}

module.exports = dfDropMissing

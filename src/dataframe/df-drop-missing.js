const assert = require("../assert")
const isString = require("../is-string")
const isUndefined = require("../is-undefined")
const isWholeNumber = require("../helpers/is-whole-number")
const shape = require("../shape")

function dfDropMissing(DataFrame, Series, df, axis, condition, threshold) {
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

  // drop rows
  if (axis === 0) {
    out = out.assign(tempID, out.index)

    const newValues = out.values.map(helper).filter(row => row.length > 0)

    if (shape(newValues).length < 2) return new DataFrame()

    out.values = newValues

    let newIndex = out.get(null, tempID)
    if (isUndefined(newIndex)) return new DataFrame()
    if (isString(newIndex)) newIndex = [newIndex]
    if (newIndex instanceof Series) newIndex = newIndex.values
    out.index = newIndex
    out = out.drop(null, tempID)
  }

  // drop columns
  else if (axis === 1) {
    const temp = {}

    out.columns.forEach((colName, i) => {
      const values = out.values.map(row => row[i])
      const newValues = helper(values)

      if (newValues.length > 0) {
        temp[colName] = newValues
      }
    })

    if (
      Object.keys(temp).length + Object.getOwnPropertySymbols(temp).length ===
      0
    ) {
      return new DataFrame()
    }

    const newOut = new DataFrame(temp)
    newOut.index = out.index
    return newOut
  }

  return out
}

module.exports = dfDropMissing

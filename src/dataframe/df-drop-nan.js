const assert = require("../assert")
const dropNaN = require("../drop-nan")
const isWholeNumber = require("../helpers/is-whole-number")

function dfDropNaN(DataFrame, df, axis, condition, threshold) {
  axis = axis || 0

  assert(
    axis === 0 || axis === 1,
    "The first parameter of the `dropNaN` method (the `axis`) must be 0 or 1."
  )

  threshold = threshold || 0

  assert(
    isWholeNumber(threshold),
    "The third parameter of the `dropNaN` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` NaN values)."
  )

  condition = threshold > 0 ? "none" : condition || "any"

  assert(
    condition === "any" || condition === "all" || condition === "none",
    "The second parameter of the `dropNaN` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains NaN values, then it should be dropped; or that if 'all' of the data contains NaN values, then it should be dropped)."
  )

  function helper(values) {
    const numericalValues = dropNaN(values)
    if (threshold > 0) return values.length - numericalValues.length < threshold
    if (condition === "any") return numericalValues.length === values.length
    if (condition === "all") return numericalValues.length > 0
    return true
  }

  const out = df.copy()

  if (axis === 0) {
    const rowsToKeep = out.index.filter(row => {
      const values = out.get(row, null).values
      return helper(values)
    })

    if (rowsToKeep.length > 0) return out.get(rowsToKeep, null)
    else return new DataFrame()
  } else if (axis === 1) {
    const colsToKeep = out.columns.filter(col => {
      const values = out.get(null, col).values
      return helper(values)
    })

    if (colsToKeep.length > 0) return out.get(null, colsToKeep)
    else return new DataFrame()
  }

  return out
}

module.exports = dfDropNaN

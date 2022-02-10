const assert = require("../assert.js")
const copy = require("../copy.js")
const isFunction = require("../is-function.js")
const Series = require("../series")
const shape = require("../shape.js")
const transpose = require("../transpose.js")

function dfApply(DataFrame, df, fn, axis) {
  axis = axis || 0

  assert(
    isFunction(fn),
    "The first parameter to the `apply` method must be a function."
  )

  assert(
    axis === 0 || axis === 1,
    "The second parameter to the `apply` method (the `axis`) must be 0 or 1."
  )

  if (axis === 0) {
    const temp = transpose(df.values)

    const newValues = temp.map((col, i) => {
      const series = new Series(col)
      series.name = df.columns[i]
      series.index = df.index
      return fn(series, i, df)
    })

    if (shape(newValues).length === 1) {
      const out = new Series(newValues)
      out.index = copy(df.columns)
      return out
    } else {
      const out = new DataFrame(transpose(newValues))
      out.index = copy(df.index)
      out.columns = copy(df.columns)
      return out
    }
  } else if (axis === 1) {
    const newValues = df.values.map((row, i) => {
      const series = new Series(row)
      series.name = df.index[i]
      series.index = df.columns
      return fn(series, i, df)
    })

    if (shape(newValues).length === 1) {
      const out = new Series(newValues)
      out.index = copy(df.index)
      return out
    } else {
      const out = new DataFrame(newValues)
      out.index = copy(df.index)
      out.columns = copy(df.columns)
      return out
    }
  }
}

module.exports = dfApply

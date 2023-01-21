const assert = require("../assert")
const isArray = require("../is-array")
const isFunction = require("../is-function")
const isUndefined = require("../is-undefined")

function dfApply(DataFrame, Series, df, fn, axis) {
  axis = axis || 0

  assert(
    isFunction(fn),
    "The first parameter to the `apply` method must be a function."
  )

  assert(
    axis === 0 || axis === 1,
    "The second parameter to the `apply` method (the `axis`) must be 0 or 1."
  )

  // apply to columns
  if (axis === 0) {
    const temp = {}
    let shouldReturnADataFrame

    df.columns.forEach((colName, i) => {
      const series = new Series(df.values.map(row => row[i]))
      series.name = colName
      series.index = df.index
      const value = fn(series, i, df)

      if (value instanceof Series) {
        temp[colName] = value.values
      } else {
        temp[colName] = value
      }

      if (isUndefined(shouldReturnADataFrame)) {
        shouldReturnADataFrame = value instanceof Series || isArray(value)
      }
    })

    if (shouldReturnADataFrame) {
      const out = new DataFrame(temp)
      out.index = df.index
      return out
    } else {
      const out = new Series(df.columns.map(colName => temp[colName]))
      out.index = df.columns
      return out
    }
  }

  // apply to rows
  else if (axis === 1) {
    let shouldReturnADataFrame

    const temp = df.values.map((row, i) => {
      const series = new Series(row)
      series.name = df.index[i]
      series.index = df.columns
      const value = fn(series, i, df)

      if (isUndefined(shouldReturnADataFrame)) {
        shouldReturnADataFrame = value instanceof Series || isArray(value)
      }

      if (value instanceof Series) {
        return value.values
      } else {
        return value
      }
    })

    if (shouldReturnADataFrame) {
      const out = new DataFrame(temp)
      out.index = df.index
      out.columns = df.columns
      return out
    } else {
      const out = new Series(temp)
      out.index = df.index
      return out
    }
  }
}

module.exports = dfApply

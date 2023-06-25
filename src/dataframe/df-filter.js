const assert = require("../assert")
const flatten = require("../flatten")
const isFunction = require("../is-function")
const isUndefined = require("../is-undefined")

function arrayToObject(x) {
  const out = {}

  flatten(x).forEach((value, i) => {
    out[value] = i
  })

  return out
}

function undoArrayToObject(obj) {
  return Object.keys(obj)
    .concat(Object.getOwnPropertySymbols(obj))
    .sort((a, b) => obj[a] - obj[b])
}

function dfFilter(DataFrame, Series, df, fn, axis) {
  assert(
    isFunction(fn),
    "The `filter` method takes a single parameter: a function that is used to filter the values."
  )

  if (isUndefined(axis)) axis = 0

  assert(
    axis === 0 || axis === 1,
    "The `axis` parameter to the `filter` method must be 0 or 1."
  )

  let out = df.copy()
  if (out.isEmpty) return out

  const index = arrayToObject(out.index)
  const columns = arrayToObject(out.columns)

  // filter rows
  if (axis === 0) {
    const newValues = out.values.filter((row, i) => {
      const series = new Series(row)
      series.name = df.index[i]
      series.index = df.columns
      const shouldKeep = fn(series, i, df)
      if (!shouldKeep) delete index[out.index[i]]
      return shouldKeep
    })

    if (flatten(newValues).length === 0) {
      return new DataFrame()
    }

    if (newValues.length === 1) {
      const temp = new Series(flatten(newValues))
      temp.name = undoArrayToObject(index)[0]
      temp.index = undoArrayToObject(columns)
      return temp
    }

    out.values = newValues
    out.index = undoArrayToObject(index)
  }

  // filter columns
  else if (axis === 1) {
    out = out.transpose()

    const newValues = out.values.filter((row, i) => {
      const series = new Series(row)
      series.name = df.columns[i]
      series.index = df.index
      const shouldKeep = fn(series, i, df)
      if (!shouldKeep) delete columns[out.index[i]]
      return shouldKeep
    })

    if (flatten(newValues).length === 0) {
      return new DataFrame()
    }

    if (newValues.length === 1) {
      const temp = new Series(flatten(newValues))
      temp.name = undoArrayToObject(columns)[0]
      temp.index = undoArrayToObject(index)
      return temp
    }

    out.values = newValues
    out.index = undoArrayToObject(columns)

    out = out.transpose()
  }

  return out
}

module.exports = dfFilter

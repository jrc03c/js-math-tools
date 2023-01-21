const assert = require("../assert")
const isUndefined = require("../is-undefined")

function dfToObject(df, axis) {
  if (isUndefined(axis)) {
    axis = 0
  } else {
    assert(
      axis === 0 || axis === 1,
      "The axis parameter of the `toObject` method must be undefined, 0, or 1. An axis of 0 indicates that the returned object should be organized first by rows and then by columns. An axis of 1 indicates that the returned object should be organized first by columns and then by rows."
    )
  }

  // rows then columns
  const out = {}

  if (axis === 0) {
    df.index.forEach((rowName, i) => {
      const temp = {}

      df.columns.forEach((colName, j) => {
        temp[colName] = df.values[i][j]
      })

      out[rowName] = temp
    })
  }

  // columns then rows
  else {
    df.columns.forEach((colName, j) => {
      const temp = {}

      df.index.forEach((rowName, i) => {
        temp[rowName] = df.values[i][j]
      })

      out[colName] = temp
    })
  }

  return out
}

module.exports = dfToObject

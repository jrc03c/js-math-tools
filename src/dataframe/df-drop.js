const assert = require("../assert")
const isArray = require("../is-array")
const isNumber = require("../is-number")
const isString = require("../is-string")
const isUndefined = require("../is-undefined")
const shape = require("../shape")

function dfDrop(DataFrame, Series, df, rows, cols) {
  if (isUndefined(rows)) rows = []
  if (isUndefined(cols)) cols = []
  if (isString(rows) || isNumber(rows)) rows = [rows]
  if (isString(cols) || isNumber(cols)) cols = [cols]

  assert(
    isArray(rows),
    "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
  )

  assert(
    isArray(cols),
    "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
  )

  assert(
    shape(rows).length === 1,
    "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
  )

  assert(
    shape(cols).length === 1,
    "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
  )

  let outIndex, outColumns

  df.index.forEach((row, i) => {
    if (rows.indexOf(row) < 0 && rows.indexOf(i) < 0) {
      if (!outIndex) outIndex = []
      outIndex.push(row)
    }
  })

  df.columns.forEach((col, i) => {
    if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0) {
      if (!outColumns) outColumns = []
      outColumns.push(col)
    }
  })

  let out = df.get(outIndex, outColumns)

  if (out instanceof Series) {
    let temp = new DataFrame()
    temp = temp.assign(out)
    if (df.index.indexOf(out.name) > -1) temp = temp.transpose()
    out = temp
  }

  return out
}

module.exports = dfDrop

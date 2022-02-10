const isUndefined = require("../is-undefined.js")
const range = require("../range.js")
const isArray = require("../is-array.js")
const isNumber = require("../is-number.js")
const assert = require("../assert.js")
const shape = require("../shape.js")
const isWholeNumber = require("./is-whole-number.js")

function dfGetSubsetByIndices(df, rowIndices, colIndices) {
  const dataShape = df.shape

  if (isUndefined(rowIndices)) rowIndices = range(0, dataShape[0])
  if (isUndefined(colIndices)) colIndices = range(0, dataShape[1])
  if (isNumber(rowIndices)) rowIndices = [rowIndices]
  if (isNumber(colIndices)) colIndices = [colIndices]

  assert(
    isArray(rowIndices) && isArray(colIndices),
    "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
  )

  assert(
    shape(rowIndices).length === 1 && shape(colIndices).length === 1,
    "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
  )

  assert(
    rowIndices.length > 0,
    "The `rowIndices` array must contain at least one index."
  )

  assert(
    colIndices.length > 0,
    "The `colIndices` array must contain at least one index."
  )

  rowIndices.forEach(rowIndex => {
    assert(
      isWholeNumber(rowIndex),
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    )

    assert(
      rowIndex < df.index.length,
      `The row index ${rowIndex} is out of bounds.`
    )
  })

  colIndices.forEach(colIndex => {
    assert(
      isWholeNumber(colIndex),
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    )

    assert(
      colIndex < df.columns.length,
      `The column index ${colIndex} is out of bounds.`
    )
  })

  const rows = rowIndices.map(i => df.index[i])
  const cols = colIndices.map(i => df.columns[i])
  return df.getSubsetByNames(rows, cols)
}

module.exports = dfGetSubsetByIndices

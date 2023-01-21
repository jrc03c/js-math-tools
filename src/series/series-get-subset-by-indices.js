const assert = require("../assert")
const isArray = require("../is-array")
const isUndefined = require("../is-undefined")
const isWholeNumber = require("../helpers/is-whole-number")
const range = require("../range")
const shape = require("../shape")

function seriesGetSubsetByIndices(series, indices) {
  const dataShape = series.shape

  if (isUndefined(indices)) indices = range(0, dataShape[0])

  assert(
    isArray(indices),
    "The `indices` array must be 1-dimensional array of whole numbers."
  )

  assert(
    shape(indices).length === 1,
    "The `indices` array must be a 1-dimensional array of whole numbers."
  )

  assert(
    indices.length > 0,
    "The `indices` array must contain at least one index."
  )

  indices.forEach(index => {
    assert(
      isWholeNumber(index),
      "The `indices` array must be a 1-dimensional array of whole numbers."
    )

    assert(
      index < series.index.length,
      `The row index ${index} is out of bounds.`
    )
  })

  const rows = indices.map(i => series.index[i])
  return series.getSubsetByNames(rows)
}

module.exports = seriesGetSubsetByIndices

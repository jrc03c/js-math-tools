const assert = require("../assert")
const isArray = require("../is-array")
const isString = require("../is-string")
const isUndefined = require("../is-undefined")
const shape = require("../shape")

function seriesGetSubsetByNames(Series, series, indices) {
  if (isUndefined(indices)) indices = series.index

  assert(
    isArray(indices),
    "The `indices` array must be a 1-dimensional array of strings."
  )

  assert(
    shape(indices).length === 1,
    "The `indices` array must be a 1-dimensional array of strings."
  )

  assert(
    indices.length > 0,
    "The `indices` array must contain at least one index name."
  )

  indices.forEach(name => {
    assert(isString(name), "The `indices` array must contain only strings.")

    assert(
      series.index.indexOf(name) > -1,
      `The name "${name}" does not exist in the index.`
    )
  })

  const values = indices.map(name => {
    return series.values[series.index.indexOf(name)]
  })

  if (values.length === 1) return values[0]

  const out = new Series(values)
  out.index = indices
  out.name = series.name
  return out
}

module.exports = seriesGetSubsetByNames

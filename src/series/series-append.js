const assert = require("../assert.js")
const isArray = require("../is-array.js")
const isDataFrame = require("../is-dataframe.js")
const isNested = require("../is-nested.js")
const isSeries = require("../is-series.js")
const shape = require("../shape.js")

function seriesAppend(Series, series, x) {
  if (isSeries(x)) {
    return new Series(series.values.concat(x.values))
  }

  if (isArray(x)) {
    const xShape = shape(x)

    assert(
      xShape.length === 1 && !isNested(xShape),
      "Only vectors can be appended to Series!"
    )

    const out = series.copy()

    x.forEach((v, i) => {
      out._values.push(v)
      out._index.push("item" + (series.values.length + i))
    })

    return out
  }

  assert(!isDataFrame(x), "DataFrames cannot be appended to Series!")
  return seriesAppend(series, [x])
}

module.exports = seriesAppend

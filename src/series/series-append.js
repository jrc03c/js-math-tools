const assert = require("../assert")
const isArray = require("../is-array")
const isDataFrame = require("../is-dataframe")
const isNested = require("../is-nested")
const isSeries = require("../is-series")
const shape = require("../shape")

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

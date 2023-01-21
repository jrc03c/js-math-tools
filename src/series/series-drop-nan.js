const isNumber = require("../is-number")

function seriesDropNaN(Series, series) {
  const index = []
  const values = []

  series.values.forEach((value, i) => {
    if (isNumber(value)) {
      values.push(value)
      index.push(series.index[i])
    }
  })

  const out = new Series(values)
  out.name = series.name
  out.index = index
  return out
}

module.exports = seriesDropNaN

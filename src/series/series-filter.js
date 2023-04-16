const { copy } = require("../copy")

function seriesFilter(Series, series, fn) {
  let out = series.copy()
  const index = copy(out.index)
  const indicesToRemove = []

  const newValues = out.values.filter((value, i) => {
    const shouldKeep = fn(value, i, out.values)
    if (!shouldKeep) indicesToRemove.push(out.index[i])
    return shouldKeep
  })

  indicesToRemove.forEach(i => {
    index.splice(index.indexOf(i), 1)
  })

  if (newValues.length === 0) {
    out = new Series()
    out.name = series.name
    return out
  }

  out.values = newValues
  out.index = index
  return out
}

module.exports = seriesFilter

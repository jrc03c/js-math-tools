function seriesToObject(series) {
  const out = {}
  out[series.name] = {}

  series.index.forEach((index, i) => {
    out[series.name][index] = series.values[i]
  })

  return out
}

module.exports = seriesToObject

const isUndefined = require("../is-undefined.js")

function seriesDropMissing(series) {
  const out = series.copy()
  const outIndex = []

  out.values = out.values.filter((v, i) => {
    if (isUndefined(v)) {
      return false
    } else {
      outIndex.push(out.index[i])
      return true
    }
  })

  out.index = outIndex
  return out
}

module.exports = seriesDropMissing

const shuffle = require("../shuffle.js")

function seriesShuffle(series) {
  const out = series.copy()
  return out.get(shuffle(out.index))
}

module.exports = seriesShuffle

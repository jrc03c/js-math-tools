const assert = require("../assert")
const isUndefined = require("../is-undefined")
const shuffle = require("../shuffle")

function dfShuffle(df, axis) {
  if (isUndefined(axis)) axis = 0

  assert(
    axis === 0 || axis === 1,
    "The `axis` parameter to the `shuffle` must be 0, 1, or undefined."
  )

  return df.get(
    axis === 0 ? shuffle(df.index) : null,
    axis === 1 ? shuffle(df.columns) : null
  )
}

module.exports = dfShuffle

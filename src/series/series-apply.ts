const assert = require("../assert.js")
const isFunction = require("../is-function.js")

function seriesApply(series, fn) {
  assert(
    isFunction(fn),
    "The parameter to the `apply` method must be a function."
  )

  const out = series.copy()
  out._values = out._values.map((v, i) => fn(v, i))
  return out
}

module.exports = seriesApply

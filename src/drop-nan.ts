const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isNumber = require("./is-number.js")
const isSeries = require("./is-series.js")

function dropNaN(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return x.dropNaN(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(x),
    "The `dropNaN` function only works on arrays, Series, and DataFrames!"
  )

  const out = []

  x.forEach(v => {
    try {
      return out.push(dropNaN(v))
    } catch (e) {
      if (isNumber(v)) {
        return out.push(v)
      }
    }
  })

  return out
}

module.exports = dropNaN

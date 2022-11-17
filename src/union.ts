const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")
const set = require("./set.js")

function union() {
  return set(
    [...arguments].map(v => {
      if (isArray(v)) return v
      if (isDataFrame(v)) return v.values
      if (isSeries(v)) return v.values
      return [v]
    })
  )
}

module.exports = union

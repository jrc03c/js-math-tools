const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const set = require("./set")

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

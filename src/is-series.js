const { Series } = require("./dataframe")

function isSeries(x) {
  return x instanceof Series
}

module.exports = isSeries

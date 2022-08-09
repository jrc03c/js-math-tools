const { DataFrame } = require("./dataframe")

function isDataFrame(x) {
  return x instanceof DataFrame
}

module.exports = isDataFrame

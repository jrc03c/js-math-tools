const Series = require("../series")

function isSeries(x) {
  return x instanceof Series
}

module.exports = isSeries

const covariance = require("./covariance.js")
const std = require("./std.js")

function correl(x, y) {
  try {
    return covariance(x, y) / (std(x) * std(y))
  } catch (e) {
    return NaN
  }
}

module.exports = correl

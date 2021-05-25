const covariance = require("./covariance.js")
const std = require("./std.js")
const dropNaNPairwise = require("./drop-nan-pairwise.js")

function correl(x, y) {
  try {
    const [xTemp, yTemp] = dropNaNPairwise(x, y)
    if (xTemp.length === 0 || yTemp.length === 0) return NaN
    return covariance(xTemp, yTemp) / (std(xTemp) * std(yTemp))
  } catch (e) {
    return NaN
  }
}

module.exports = correl

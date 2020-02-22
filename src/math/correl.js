let covariance = require("./covariance.js")
let std = require("./std.js")

function correl(x, y){
  return covariance(x, y) / (std(x) * std(y))
}

module.exports = correl

let mean = require("./mean.js")

function covariance(x, y){
  let mx = mean(x)
  let my = mean(y)
  let out = 0
  for (let i=0; i<x.length; i++) out += (x[i] - mx) * (y[i] - my)
  return out / x.length
}

module.exports = covariance

let isArray = require("./is-array.js")

function map(x, a, b, c, d){
  if (isArray(x)) return x.map(v => map(v, a, b, c, d))
  return (d - c) * (x - a) / (b - a) + c
}

module.exports = map

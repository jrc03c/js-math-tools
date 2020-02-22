let isArray = require("./is-array.js")

function pow(x, p){
  if (isArray(x)) return x.map(v => pow(v, p))
  return Math.pow(x, p)
}

module.exports = pow

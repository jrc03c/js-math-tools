let isArray = require("./is-array.js")

function clamp(x, a, b){
  if (isArray(x)) return x.map(v => clamp(v, a, b))
  if (x < a) return a
  if (x > b) return b
  return x
}

module.exports = clamp

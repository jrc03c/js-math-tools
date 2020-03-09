let flatten = require("./flatten.js")

function sum(arr){
  let out = 0
  flatten(arr).forEach(v => out += v)
  return out
}

module.exports = sum

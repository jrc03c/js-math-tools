let mean = require("./mean.js")
let pow = require("./pow.js")
let sqrt = require("./sqrt.js")

function std(arr){
  let m = mean(arr)
  let out = 0
  arr.forEach(x => out += pow(x - m, 2))
  return sqrt(out / arr.length)
}

module.exports = std

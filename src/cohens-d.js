let mean = require("./mean.js")
let sqrt = require("./sqrt.js")
let variance = require("./variance.js")

function cohensd(arr1, arr2){
  let m1 = mean(arr1)
  let m2 = mean(arr2)
  let s = sqrt((variance(arr1) + variance(arr2)) / 2)
  return (m1 - m2) / s
}

module.exports = cohensd

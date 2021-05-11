let mean = require("./mean.js")
let sqrt = require("./sqrt.js")
let variance = require("./variance.js")
let dropNaNPairwise = require("./drop-nan-pairwise.js")

function cohensd(arr1, arr2){
  let results = dropNaNPairwise(arr1, arr2)
  let arr1Temp = results.a
  let arr2Temp = results.b
  if (arr1Temp.length === 0 || arr2Temp.length === 0) return undefined
  let m1 = mean(arr1Temp)
  let m2 = mean(arr2Temp)
  let s = sqrt((variance(arr1Temp) + variance(arr2Temp)) / 2)
  return (m1 - m2) / s
}

module.exports = cohensd

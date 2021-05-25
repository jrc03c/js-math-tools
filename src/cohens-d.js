const mean = require("./mean.js")
const sqrt = require("./sqrt.js")
const variance = require("./variance.js")
const dropNaNPairwise = require("./drop-nan-pairwise.js")

function cohensd(arr1, arr2) {
  try {
    const [arr1Temp, arr2Temp] = dropNaNPairwise(arr1, arr2)
    if (arr1Temp.length === 0 || arr2Temp.length === 0) return NaN
    const m1 = mean(arr1Temp)
    const m2 = mean(arr2Temp)
    const s = sqrt((variance(arr1Temp) + variance(arr2Temp)) / 2)
    return (m1 - m2) / s
  } catch (e) {
    return NaN
  }
}

module.exports = cohensd

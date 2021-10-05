const mean = require("./mean.js")
const variance = require("./variance.js")

function cohensd(arr1, arr2) {
  try {
    const m1 = mean(arr1)
    const m2 = mean(arr2)
    const s = Math.sqrt((variance(arr1) + variance(arr2)) / 2)
    return (m1 - m2) / s
  } catch (e) {
    return NaN
  }
}

module.exports = cohensd

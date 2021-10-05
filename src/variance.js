const mean = require("./mean.js")
const flatten = require("./flatten.js")

function variance(arr) {
  try {
    const temp = flatten(arr)
    const m = mean(temp)
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      out += (temp[i] - m) * (temp[i] - m)
    }

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = variance

const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")
const mean = require("./mean.js")
const pow = require("./pow.js")
const sqrt = require("./sqrt.js")

function std(arr) {
  try {
    if (arr.length === 0) return NaN

    const temp = flatten(arr)
    if (temp.length === 0) return NaN

    const m = mean(temp)
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      const value = temp[i]
      if (!isNumber(value)) return NaN
      out += pow(value - m, 2)
    }

    return sqrt(out / temp.length)
  } catch (e) {
    return NaN
  }
}

module.exports = std

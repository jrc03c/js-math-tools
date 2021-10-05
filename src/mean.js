const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")

function mean(arr) {
  try {
    const temp = flatten(arr)
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      if (!isNumber(temp[i])) return NaN
      out += temp[i]
    }

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = mean

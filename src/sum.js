const dropNaN = require("./drop-nan.js")
const flatten = require("./flatten.js")
const isNumber = require("./is-number.js")

function sum(arr) {
  try {
    const temp = flatten(arr)
    if (temp.length === 0) return NaN
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      const value = temp[i]
      if (isNumber(value)) out += value
      else return NaN
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = sum

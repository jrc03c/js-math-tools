const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")
const sum = require("./sum.js")
const dropNaN = require("./drop-nan.js")

function mean(arr) {
  try {
    if (arr.length === 0) return NaN
    const temp = flatten(arr)
    let out = 0

    for (let i = 0; i < temp.length; i++) {
      const value = temp[i]
      if (!isNumber(value)) return NaN
      out += value
    }

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = mean

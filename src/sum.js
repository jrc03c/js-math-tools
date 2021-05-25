const dropNaN = require("./drop-nan.js")
const flatten = require("./flatten.js")
const isNumber = require("./is-number.js")

function sum(arr) {
  try {
    const temp = dropNaN(flatten(arr))
    if (temp.length === 0) return NaN

    let out = 0

    temp.forEach(value => {
      if (isNumber(value)) out += value
    })

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = sum

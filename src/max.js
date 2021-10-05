const flatten = require("./flatten.js")
const isNumber = require("./is-number.js")

function max(arr) {
  try {
    const temp = flatten(arr)
    let out = -Infinity

    for (let i = 0; i < temp.length; i++) {
      if (!isNumber(temp[i])) return NaN
      if (temp[i] > out) out = temp[i]
    }

    return out === -Infinity ? NaN : out
  } catch (e) {
    return NaN
  }
}

module.exports = max

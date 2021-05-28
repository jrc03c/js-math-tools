const flatten = require("./flatten.js")
const isUndefined = require("./is-undefined.js")

function max(arr) {
  try {
    const temp = flatten(arr)
    let out = -Infinity

    temp.forEach(x => {
      if (!isUndefined(x) && x > out) {
        out = x
      }
    })

    return out === -Infinity ? NaN : out
  } catch (e) {
    return NaN
  }
}

module.exports = max

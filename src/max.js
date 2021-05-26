const flatten = require("./flatten.js")

function max(arr) {
  try {
    const temp = flatten(arr)
    let out = -Infinity

    temp.forEach(function (x) {
      if (x > out) {
        out = x
      }
    })

    return out === -Infinity ? NaN : out
  } catch (e) {
    return NaN
  }
}

module.exports = max

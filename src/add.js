const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function add() {
  try {
    let out = 0
    const x = Object.values(arguments)

    for (let i = 0; i < x.length; i++) {
      if (!isNumber(x[i])) return NaN
      out += x[i]
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(add)

const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

function multiply() {
  try {
    let out = 1
    const x = Object.values(arguments)

    for (let i = 0; i < x.length; i++) {
      if (!isNumber(x[i])) return NaN
      out *= x[i]
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(multiply)

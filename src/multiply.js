const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function multiply() {
  try {
    const values = Object.values(arguments)
    if (values.length === 0) return NaN

    let out = 1

    for (let i = 0; i < values.length; i++) {
      if (!isNumber(values[i])) return NaN
      out *= values[i]
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(multiply)

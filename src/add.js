const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

const add = vectorize(function () {
  try {
    let out
    const keys = Object.keys(arguments)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = arguments[key]
      if (!isNumber(value)) return NaN
      if (!out) out = value
      else out += arguments[key]
    }

    return out
  } catch (e) {
    return NaN
  }
})

module.exports = add

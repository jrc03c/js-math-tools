const vectorize = require("./vectorize.js")

const add = vectorize(function () {
  try {
    let out = 0
    const x = Object.values(arguments)

    for (let i = 0; i < x.length; i++) {
      if (isNaN(x[i])) return NaN
      out += x[i]
    }

    return out
  } catch (e) {
    return NaN
  }
})

module.exports = add

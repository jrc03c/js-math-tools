let vectorize = require("./vectorize.js")

let ceil = vectorize(function (x) {
  try {
    if (typeof x !== "number") return NaN
    return Math.ceil(x)
  } catch (e) {
    return NaN
  }
})

module.exports = ceil

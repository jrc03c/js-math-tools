let vectorize = require("./vectorize.js")

let ceil = vectorize(function (x) {
  try {
    return Math.ceil(x)
  } catch (e) {
    return NaN
  }
})

module.exports = ceil

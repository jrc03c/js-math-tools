const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isNumber = require("./is-number.js")
const vectorize = require("./vectorize.js")

const arccos = vectorize(function (x) {
  try {
    return Math.acos(x)
  } catch (e) {
    return NaN
  }
})

module.exports = arccos

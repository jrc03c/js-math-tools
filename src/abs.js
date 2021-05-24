const assert = require("./assert.js")
const vectorize = require("./vectorize.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const isUndefined = require("./is-undefined.js")

const abs = vectorize(function (x) {
  try {
    if (typeof x === "boolean") return NaN
    return Math.abs(x)
  } catch (e) {
    return NaN
  }
})

module.exports = abs

const pow = require("./pow.js")
const sum = require("./sum.js")
const add = require("./add.js")
const scale = require("./scale.js")
const sqrt = require("./sqrt.js")
const set = require("./set.js")
const flatten = require("./flatten.js")

function distance(a, b) {
  try {
    const types = set(flatten(a.concat(b)).map(v => typeof v))
    if (types.length > 1 || types[0] !== "number") return NaN
    return sqrt(sum(pow(add(a, scale(b, -1)), 2)))
  } catch (e) {
    return NaN
  }
}

module.exports = distance

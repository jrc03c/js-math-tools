const pow = require("./pow.js")
const sum = require("./sum.js")
const add = require("./add.js")
const scale = require("./scale.js")
const sqrt = require("./sqrt.js")
const set = require("./set.js")
const flatten = require("./flatten.js")

function distance(a, b) {
  try {
    const atemp = flatten(a)
    const btemp = flatten(b)

    let s = 0

    for (let i = 0; i < atemp.length; i++) {
      s += (atemp[i] - btemp[i]) * (atemp[i] - btemp[i])
    }

    return Math.sqrt(s)
  } catch (e) {
    return NaN
  }
}

module.exports = distance

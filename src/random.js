const ndarray = require("./ndarray.js")
const apply = require("./apply.js")
const isUndefined = require("./is-undefined.js")
const seed = require("./seed.js")
const pow = require("./pow.js")

const a = 1103515245
const c = 12345
const m = pow(2, 31)

function lcg() {
  const s = seed()
  const out = (a * s + c) % m
  seed(out)
  return out / m
}

function random(shape) {
  if (isUndefined(shape)) return lcg()
  return apply(ndarray(shape), lcg)
}

module.exports = random

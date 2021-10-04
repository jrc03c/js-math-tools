const isUndefined = require("./is-undefined.js")
const ndarray = require("./ndarray.js")
const apply = require("./apply.js")
const { random } = require("./random.js")
const reshape = require("./reshape.js")
const isNumber = require("./is-number.js")

function helper() {
  const u1 = random()
  const u2 = random()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function product(vals) {
  let out = 1
  vals.forEach(v => (out *= v))
  return out
}

function normal(shape) {
  if (isUndefined(shape)) return helper()

  if (isNumber(shape)) shape = [shape]
  const out = []
  const n = product(shape)
  for (let i = 0; i < n; i++) out.push(helper())
  return reshape(out, shape)
}

module.exports = normal

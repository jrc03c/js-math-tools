const isNumber = require("./is-number.js")
const isUndefined = require("./is-undefined.js")
const reshape = require("./reshape.js")
const { random } = require("./random.js")

function helper() {
  const u1 = random()
  const u2 = random()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function normal(shape) {
  if (isUndefined(shape)) return helper()

  if (isNumber(shape)) shape = [shape]
  const out = []
  let n = 1
  shape.forEach(v => (n *= v))
  for (let i = 0; i < n; i++) out.push(helper())
  return reshape(out, shape)
}

module.exports = normal

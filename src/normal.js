const { random } = require("./random.js")
const apply = require("./apply.js")
const isUndefined = require("./is-undefined.js")
const ndarray = require("./ndarray.js")

function helper() {
  const u1 = random()
  const u2 = random()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function normal(shape) {
  if (isUndefined(shape)) return helper()
  return apply(ndarray(shape), helper)
}

module.exports = normal

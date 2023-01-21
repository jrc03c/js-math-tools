const { random } = require("./random")
const apply = require("./apply")
const isUndefined = require("./is-undefined")
const ndarray = require("./ndarray")

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

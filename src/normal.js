const isUndefined = require("./is-undefined.js")
const ndarray = require("./ndarray.js")
const apply = require("./apply.js")
const random = require("./random.js")

function normal(shape) {
  function n() {
    const u1 = random()
    const u2 = random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  if (isUndefined(shape)) return n()
  return apply(ndarray(shape), n)
}

module.exports = normal

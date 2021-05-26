const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const floor = require("./floor.js")
const range = require("./range.js")

const error =
  "You must pass an integer or a one-dimensional array of natural numbers into the `ndarray` function!"

function ndarray(shape) {
  assert(!isUndefined(shape), error)

  if (!isArray(shape)) shape = [shape]

  assert(shape.length > 0, error)

  shape.forEach(function (x) {
    assert(isNumber(x), error)
    assert(floor(x) === x, error)
    assert(x >= 0, error)
  })

  if (shape.length === 1) {
    return range(0, shape[0]).map(v => undefined)
  } else {
    const out = []

    for (let i = 0; i < shape[0]; i++) {
      out.push(ndarray(shape.slice(1, shape.length)))
    }

    return out
  }
}

module.exports = ndarray

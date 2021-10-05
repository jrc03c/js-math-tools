const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")

const error =
  "You must pass a natural number or a one-dimensional array of natural numbers into the `ndarray` function!"

function ndarray(shape, shouldSkipChecks) {
  if (!shouldSkipChecks) {
    assert(!isUndefined(shape), error)
    if (!isArray(shape)) shape = [shape]
    shape = flatten(shape)

    assert(shape.length > 0, error)

    shape.forEach(x => {
      assert(isNumber(x), error)
      assert(parseInt(x) === x, error)
      assert(x >= 0, error)
    })
  }

  if (shape.length === 1) {
    const out = []
    for (let i = 0; i < shape[0]; i++) out.push(undefined)
    return out
  } else {
    const out = []

    for (let i = 0; i < shape[0]; i++) {
      out.push(ndarray(shape.slice(1), true))
    }

    return out
  }
}

module.exports = ndarray

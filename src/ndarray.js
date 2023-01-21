const assert = require("./assert")
const isArray = require("./is-array")
const isNested = require("./is-nested")
const isNumber = require("./is-number")
const isUndefined = require("./is-undefined")

const error =
  "You must pass a natural number or a one-dimensional array of natural numbers into the `ndarray` function!"

function ndarray(shape) {
  assert(!isUndefined(shape), error)
  if (!isArray(shape)) shape = [shape]
  assert(!isNested(shape), error)
  assert(shape.length > 0, error)

  const s = shape[0]
  assert(isNumber(s), error)
  assert(parseInt(s) === s, error)
  assert(s >= 0, error)

  assert(
    s !== Infinity,
    "We can't create an array containing an infinite number of values!"
  )

  if (shape.length === 1) {
    const out = []
    for (let i = 0; i < s; i++) out.push(undefined)
    return out
  } else {
    const out = []

    for (let i = 0; i < s; i++) {
      out.push(ndarray(shape.slice(1)))
    }

    return out
  }
}

module.exports = ndarray

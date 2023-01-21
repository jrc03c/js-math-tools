const assert = require("./assert")
const isNumber = require("./is-number")
const isUndefined = require("./is-undefined")
const reverse = require("./reverse")

function range(a, b, step = 1) {
  assert(
    !isUndefined(a) && !isUndefined(b) && !isUndefined(step),
    "You must pass two numbers and optionally a step value to the `range` function!"
  )

  assert(
    isNumber(a) && isNumber(b) && isNumber(step),
    "You must pass two numbers and optionally a step value to the `range` function!"
  )

  assert(
    step > 0,
    "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)"
  )

  let shouldReverse = false

  if (a > b) {
    shouldReverse = true
    const buffer = a
    a = b + step
    b = buffer + step
  }

  let out = []
  for (let i = a; i < b; i += step) out.push(i)
  if (shouldReverse) out = reverse(out)
  return out
}

module.exports = range

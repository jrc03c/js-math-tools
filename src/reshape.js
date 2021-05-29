const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")
const flatten = require("./flatten.js")
const product = x => x.reduce((a, b) => a * b)

function reshape(x, newShape) {
  assert(
    isArray(x),
    "The first argument passed into the `reshape` function must be an array!"
  )

  if (isNumber(newShape)) newShape = [newShape]

  assert(
    isArray(newShape),
    "The second argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
  )

  assert(
    shape(newShape).length === 1,
    "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
  )

  newShape.forEach(v => {
    assert(
      isNumber(v) && parseInt(v) === v && v > 0,
      "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
    )
  })

  if (newShape.length <= 1) return flatten(x)

  let temp = flatten(x)

  assert(
    product(newShape) === temp.length,
    "The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!"
  )

  let out = []
  let step = parseInt(temp.length / newShape[0])

  for (let i = 0; i < newShape[0]; i++) {
    let row = temp.slice(i * step, (i + 1) * step)
    out.push(reshape(row, newShape.slice(1)))
  }

  return out
}

module.exports = reshape

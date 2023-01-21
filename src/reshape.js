const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const product = require("./product")
const shape = require("./shape")

function reshape(x, newShape) {
  if (isDataFrame(x) || isSeries(x)) {
    return reshape(x.values, newShape)
  }

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

  if (newShape.length === 0) {
    return flatten(x)
  }

  const temp = flatten(x)

  if (newShape.length === 1 && newShape[0] === temp.length) {
    return temp
  }

  assert(
    product(newShape) === temp.length,
    "The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!"
  )

  const out = []
  const step = parseInt(temp.length / newShape[0])

  for (let i = 0; i < newShape[0]; i++) {
    const row = temp.slice(i * step, (i + 1) * step)
    out.push(reshape(row, newShape.slice(1)))
  }

  return out
}

module.exports = reshape

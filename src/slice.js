const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isNumber = require("./is-number.js")
const isArray = require("./is-array.js")
const range = require("./range.js")
const flatten = require("./flatten.js")
const shape = require("./shape.js")
const floor = require("./floor.js")

function slice(arr, indices) {
  assert(!isUndefined(arr), "You must pass an array into the `slice` function!")
  assert(isArray(arr), "You must pass an array into the `slice` function!")

  if (isUndefined(indices)) return arr.slice()

  assert(
    isArray(indices),
    "The indices passed into the `slice` function must be a one-dimensional array of integers or null values."
  )

  flatten(indices).forEach(idx => {
    assert(
      isUndefined(idx) || (isNumber(idx) && floor(idx) === idx),
      "The indices passed into the `slice` function must be a one-dimensional array of integers or null values."
    )
  })

  let idx = indices[0]
  if (isUndefined(idx)) idx = range(0, arr.length)
  if (isNumber(idx)) idx = [idx]

  const out = []

  idx.forEach(i => {
    assert(i < arr.length, "Index out of bounds in the `slice` function!")
    if (i < 0) i += arr.length

    const item = arr[i]

    if (isArray(item)) {
      out.push(slice(arr[i], indices.slice(1, indices.length)))
    } else {
      out.push(arr[i])
    }
  })

  // if (shape(out).indexOf(1) > -1) out = flatten(out)

  return out
}

module.exports = slice

const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")
const transpose = require("./transpose.js")

function append(a, b, axis = 0) {
  assert(
    !isUndefined(a),
    "You must pass two arrays into the `append` function!"
  )

  assert(
    !isUndefined(b),
    "You must pass two arrays into the `append` function!"
  )

  assert(isArray(a), "You must pass two arrays into the `append` function!")
  assert(isArray(b), "You must pass two arrays into the `append` function!")

  assert(
    isNumber(axis),
    "The `axis` argument to the `append` function must be 0 or 1!"
  )

  assert(
    axis >= 0 && axis < 2,
    "The `axis` argument to the `append` function must be 0 or 1!"
  )

  assert(
    parseInt(axis) === axis,
    "The `axis` argument to the `append` function must be 0 or 1!"
  )

  const aShape = shape(a)
  const bShape = shape(b)

  assert(
    aShape.length === bShape.length,
    "The two arrays passed into the `append` function must have the same number of dimensions!"
  )

  assert(
    aShape.length < 3 && bShape.length < 3,
    "The two arrays passed into the `append` function must be 1- or 2-dimensional!"
  )

  for (let i = 0; i < aShape.length; i++) {
    if (i !== axis) {
      assert(
        aShape[i] === bShape[i],
        `The two arrays passed into the \`append\` function must have the same shapes along all axes *except* the axis along which they're being appended! (${aShape[i]} != ${bShape[i]})`
      )
    }
  }

  assert(
    axis < aShape.length,
    "The axis argument you passed into the `append` function is out of bounds for the array!"
  )

  if (aShape.length === 0) {
    return []
  } else if (aShape.length === 1) {
    return a.concat(b)
  } else if (aShape.length === 2) {
    if (axis === 0) {
      const out = []
      for (let i = 0; i < aShape[0]; i++) out.push(a[i])
      for (let i = 0; i < bShape[0]; i++) out.push(b[i])
      return out
    } else if (axis === 1) {
      return transpose(append(transpose(a), transpose(b), 0))
    }
  }
}

module.exports = append

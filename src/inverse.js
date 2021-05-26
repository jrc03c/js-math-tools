const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const flatten = require("./flatten.js")
const shape = require("./shape.js")
const slice = require("./slice.js")
const dot = require("./dot.js")
const add = require("./add.js")
const scale = require("./scale.js")
const append = require("./append.js")
const range = require("./range.js")

function inverse(x) {
  assert(
    !isUndefined(x),
    "You must pass a square 2D array into the `inverse` function!"
  )

  assert(
    isArray(x),
    "You must pass a square 2D array into the `inverse` function!"
  )

  flatten(x).forEach(v =>
    assert(
      isNumber(v),
      "The array passed into the `inverse` function must contain only numbers!"
    )
  )

  const xShape = shape(x)

  assert(
    xShape.length === 2,
    "The array passed into the `inverse` function must be exactly two-dimensional and square!"
  )

  assert(
    xShape[0] === xShape[1],
    "The array passed into the `inverse` function must be exactly two-dimensional and square!"
  )

  assert(
    xShape[0] >= 0,
    "The array passed into the `inverse` function must be exactly two-dimensional and square!"
  )

  // https://en.wikipedia.org/wiki/Invertible_matrix#Blockwise_inversion
  if (xShape[0] === 0) {
    return x
  } else if (xShape[0] === 1) {
    assert(x[0][0] !== 0, "This matrix cannot be inverted!")
    return 1 / x[0][0]
  } else if (xShape[0] === 2) {
    const a = x[0][0]
    const b = x[0][1]
    const c = x[1][0]
    const d = x[1][1]

    const det = a * d - b * c
    assert(det !== 0, "This matrix cannot be inverted!")

    const out = [
      [d, -b],
      [-c, a],
    ]

    return scale(out, 1 / det)
  } else if (xShape[0] > 1) {
    const times = (a, b) =>
      isNumber(a) || isNumber(b) ? scale(a, b) : dot(a, b)

    for (let divider = 1; divider < xShape[0] - 1; divider++) {
      try {
        const A = slice(x, [range(0, divider), range(0, divider)])
        const B = slice(x, [range(0, divider), range(divider, xShape[0])])
        const C = slice(x, [range(divider, xShape[0]), range(0, divider)])
        const D = slice(x, [
          range(divider, xShape[0]),
          range(divider, xShape[0]),
        ])

        const AInv = inverse(A)
        const CompInv = inverse(add(D, times(-1, times(times(C, AInv), B))))

        const topLeft = add(
          AInv,
          times(times(times(times(AInv, B), CompInv), C), AInv)
        )
        const topRight = times(-1, times(times(AInv, B), CompInv))
        const bottomLeft = times(-1, times(times(CompInv, C), AInv))
        const bottomRight = CompInv

        const out = append(
          append(topLeft, topRight, 1),
          append(bottomLeft, bottomRight, 1),
          0
        )

        return out
      } catch (e) {}
    }

    assert(false, "This matrix cannot be inverted!")
  }
}

module.exports = inverse

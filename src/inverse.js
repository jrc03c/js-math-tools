const add = require("./add")
const assert = require("./assert")
const dot = require("./dot")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const scale = require("./scale")
const shape = require("./shape")

function inverse(x) {
  if (isDataFrame(x)) {
    const out = x.copy()
    out.values = inverse(out.values)
    return out
  }

  assert(
    isArray(x),
    "The `inverse` function only works on square 2-dimensional arrays or DataFrames!"
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
        const A = x.slice(0, divider).map(row => row.slice(0, divider))
        const B = x.slice(0, divider).map(row => row.slice(divider, xShape[0]))
        const C = x.slice(divider, xShape[0]).map(row => row.slice(0, divider))

        const D = x
          .slice(divider, xShape[0])
          .map(row => row.slice(divider, xShape[0]))

        const AInv = inverse(A)
        const CompInv = inverse(add(D, times(-1, times(times(C, AInv), B))))

        const topLeft = add(
          AInv,
          times(times(times(times(AInv, B), CompInv), C), AInv)
        )

        const topRight = times(-1, times(times(AInv, B), CompInv))
        const bottomLeft = times(-1, times(times(CompInv, C), AInv))
        const bottomRight = CompInv

        const out = topLeft
          .map((row, i) => row.concat(topRight[i]))
          .concat(bottomLeft.map((row, i) => row.concat(bottomRight[i])))

        return out
      } catch (e) {}
    }

    assert(false, "This matrix cannot be inverted!")
  }
}

module.exports = inverse

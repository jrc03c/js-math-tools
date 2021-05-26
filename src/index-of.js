const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const shape = require("./shape.js")
const isEqual = require("./is-equal.js")

function indexOf(x, v, requireIdentity) {
  assert(
    !isUndefined(x),
    "You must pass an array and a value into the `indexOf` function!"
  )

  assert(
    isArray(x),
    "You must pass an array and a value into the `indexOf` function!"
  )

  if (shape(x).length === 1 || (isArray(v) && isEqual(shape(x[0]), shape(v)))) {
    for (let i = 0; i < x.length; i++) {
      const value = x[i]

      if (isEqual(value, v) && (requireIdentity ? value === v : true)) {
        return [i]
      }
    }

    return null
  } else {
    for (let i = 0; i < x.length; i++) {
      const row = x[i]
      const index = indexOf(row, v)
      if (index) return [i].concat(index)
    }
  }

  return null
}

module.exports = indexOf

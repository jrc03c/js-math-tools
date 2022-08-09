const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isEqual = require("./is-equal.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")

function dropNaNPairwise(a, b) {
  assert(
    isArray(a) && isArray(b),
    "The two items passed into the `dropNaNPairwise` function must be arrays!"
  )

  assert(
    isEqual(shape(a), shape(b)),
    "The two arrays passed into the `dropNaNPairwise` must have the same shape!"
  )

  const aOut = []
  const bOut = []

  for (let i = 0; i < a.length; i++) {
    try {
      const [aChildren, bChildren] = dropNaNPairwise(a[i], b[i])
      aOut.push(aChildren)
      bOut.push(bChildren)
    } catch (e) {
      if (isNumber(a[i]) && isNumber(b[i])) {
        aOut.push(a[i])
        bOut.push(b[i])
      }
    }
  }

  return [aOut, bOut]
}

module.exports = dropNaNPairwise

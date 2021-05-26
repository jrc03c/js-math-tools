const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const max = require("./max.js")
const shape = require("./shape.js")

function dropNaNPairwise(a, b) {
  assert(
    isArray(a) && isArray(b),
    "The two items passed into the `dropNaNPairwise` function must be arrays!"
  )

  assert(
    shape(a).length === 1 && shape(b).length === 1,
    "The `dropNaNPairwise` function only works on one-dimensional arrays!"
  )

  const aOut = []
  const bOut = []

  for (let i = 0; i < max([a.length, b.length]); i++) {
    if (
      !isUndefined(a[i]) &&
      isNumber(a[i]) &&
      !isUndefined(b[i]) &&
      isNumber(b[i])
    ) {
      aOut.push(a[i])
      bOut.push(b[i])
    }
  }

  return [aOut, bOut]
}

module.exports = dropNaNPairwise

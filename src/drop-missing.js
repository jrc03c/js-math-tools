const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")
const shape = require("./shape.js")

function dropMissing(x) {
  assert(
    isArray(x),
    "The value passed into the `dropMissing` function must be a one-dimensional array!"
  )

  assert(
    shape(x).length === 1,
    "The value passed into the `dropMissing` function must be a one-dimensional array!"
  )

  return x.filter(v => !isUndefined(v))
}

module.exports = dropMissing

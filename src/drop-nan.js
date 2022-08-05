const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const isUndefined = require("./is-undefined.js")
const shape = require("./shape.js")

function dropNaN(x) {
  assert(
    isArray(x),
    "The value passed into the `dropNaN` function must be a one-dimensional array!"
  )

  assert(
    shape(x).length === 1,
    "The value passed into the `dropNaN` function must be a one-dimensional array"
  )

  return x.filter(v => !isUndefined(v) && isNumber(v))
}

module.exports = dropNaN

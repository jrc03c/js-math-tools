const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isEqual = require("./is-equal.js")
const isUndefined = require("./is-undefined.js")

function diff(a, b) {
  assert(isArray(a), "You must pass two arrays into the `diff` function!")
  assert(isArray(b), "You must pass two arrays into the `diff` function!")

  const aTemp = flatten(a)
  const bTemp = flatten(b)
  const out = []

  aTemp.forEach(item => {
    const equivalent = bTemp.find(other => isEqual(other, item))

    if (isUndefined(equivalent)) {
      out.push(item)
    }
  })

  return out
}

module.exports = diff

const assert = require("./assert.js")
const isArray = require("./is-array.js")
const flatten = require("./flatten.js")

function diff(a, b) {
  assert(isArray(a), "You must pass two arrays into the `diff` function!")
  assert(isArray(b), "You must pass two arrays into the `diff` function!")

  const aTemp = flatten(a)
  const bTemp = flatten(b)
  const out = []

  aTemp.forEach(item => {
    if (bTemp.indexOf(item) < 0) out.push(item)
  })

  return out
}

module.exports = diff

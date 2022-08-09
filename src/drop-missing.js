const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")

function dropMissing(x) {
  assert(
    isArray(x),
    "The value passed into the `dropMissing` function must be an array!"
  )

  const out = []

  x.forEach(v => {
    try {
      return out.push(dropMissing(v))
    } catch (e) {
      if (!isUndefined(v)) {
        out.push(v)
      }
    }
  })

  return out
}

module.exports = dropMissing

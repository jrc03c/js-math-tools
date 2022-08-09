const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")

function dropNaN(x) {
  assert(
    isArray(x),
    "The value passed into the `dropNaN` function must be an array!"
  )

  const out = []

  x.forEach(v => {
    try {
      return out.push(dropNaN(v))
    } catch (e) {
      if (isNumber(v)) {
        return out.push(v)
      }
    }
  })

  return out
}

module.exports = dropNaN

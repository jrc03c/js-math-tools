const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")

function reverse(arr) {
  assert(
    !isUndefined(arr),
    "You must pass an array into the `reverse` function!"
  )

  assert(isArray(arr), "You must pass an array into the `reverse` function!")

  const out = []
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i])
  return out
}

module.exports = reverse

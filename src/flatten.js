const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")

function flatten(arr) {
  assert(
    !isUndefined(arr),
    "You must pass one array into the `flatten` function!"
  )

  assert(isArray(arr), "The `flatten` function only works on arrays!")

  let out = []

  arr.forEach(function (value) {
    if (isArray(value)) {
      out = out.concat(flatten(value))
    } else {
      out.push(value)
    }
  })

  return out
}

module.exports = flatten

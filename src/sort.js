const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isFunction = require("./is-function.js")
const isUndefined = require("./is-undefined.js")

function alphaSort(a, b) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

function sort(arr, fn) {
  if (isUndefined(fn)) fn = alphaSort

  assert(!isUndefined(arr), "You must pass an array into the `sort` function!")
  assert(isArray(arr), "You must pass an array into the `sort` function!")

  assert(
    isFunction(fn),
    "The second parameter of the `sort` function must be a comparison function!"
  )

  const out = arr.slice()
  out.sort(fn)
  return out
}

module.exports = sort

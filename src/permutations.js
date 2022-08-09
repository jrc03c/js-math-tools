const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const isUndefined = require("./is-undefined.js")

function permutations(arr, r) {
  assert(isArray(arr), "The `permutations` function only works on arrays!")
  if (isUndefined(r)) r = arr.length
  assert(isNumber(r), "`r` must be a whole number!")
  arr = flatten(arr)

  if (r > arr.length) {
    return permutations(arr)
  }

  if (r <= 0) {
    return [[]]
  }

  assert(r === parseInt(r), "`r` must be a whole number!")

  if (arr.length < 2) return arr
  const out = []

  arr.forEach((item, i) => {
    const before = arr.slice(0, i)
    const after = arr.slice(i + 1)
    const others = before.concat(after)
    const children = permutations(others, r - 1)

    children.forEach(child => {
      out.push([item].concat(child))
    })
  })

  return out
}

module.exports = permutations

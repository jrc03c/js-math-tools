const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const isUndefined = require("./is-undefined.js")

function permute(arr, r) {
  assert(isArray(arr), "The `permute` function only works on arrays!")
  if (isUndefined(r)) r = arr.length
  assert(isNumber(r), "`r` must be a whole number!")

  if (r > arr.length) {
    return permute(arr)
  }

  if (r <= 0) {
    return [[]]
  }

  assert(r === parseInt(r), "`r` must be a whole number!")

  if (arr.length < 2) return arr
  const out = []

  arr.forEach((item, i) => {
    assert(
      !isArray(item),
      "It is not recommended to permute arrays of arrays. Weird things happen, and I haven't figured out how to account for such a scenario yet. A possible workaround is: convert each sub-array to a string (using `JSON.stringify`), get the permutations using the array of strings, and then convert each string in each combination back to a sub-array (using `JSON.parse`)."
    )

    const before = arr.slice(0, i)
    const after = arr.slice(i + 1)
    const others = before.concat(after)
    const children = permute(others, r - 1)

    children.forEach(child => {
      out.push([item].concat(child))
    })
  })

  return out
}

module.exports = permute

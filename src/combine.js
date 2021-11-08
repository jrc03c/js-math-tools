const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const assert = require("./assert.js")

function combine(arr, r) {
  assert(isArray(arr), "The `combine` function only works on arrays!")
  assert(isNumber(r), "`r` must be a whole number!")

  if (r > arr.length) {
    return [arr]
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
      "It is not recommended to get combinations of arrays of arrays. Weird things happen, and I haven't figured out how to account for such a scenario yet. A possible workaround is: convert each sub-array to a string (using `JSON.stringify`), get the combinations using the array of strings, and then convert each string in each combination back to a sub-array (using `JSON.parse`)."
    )

    const after = arr.slice(i + 1)
    if (after.length < r - 1) return
    const children = combine(after, r - 1)

    children.forEach(child => {
      out.push([item].concat(child))
    })
  })

  return out
}

module.exports = combine

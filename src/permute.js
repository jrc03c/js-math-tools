const assert = require("./assert.js")
const isArray = require("./is-array.js")

function permute(arr) {
  assert(isArray(arr), "The `permute` function only works on arrays!")
  if (arr.length < 2) return arr
  const out = []

  arr.forEach((item, i) => {
    assert(
      !isArray(item),
      "It is not recommended to permute arrays of arrays. Weird things happen, and I haven't figured out how to account for such a scenario yet. A possible workaround is: convert each sub-array to a string (using `JSON.stringify`), permute the array of strings, and then convert each string in each permutation back to a sub-array (using `JSON.parse`)."
    )

    const before = arr.slice(0, i)
    const after = arr.slice(i + 1, arr.length)
    const others = before.concat(after)

    permute(others).forEach(other => {
      out.push([item].concat(other))
    })
  })

  return out
}

module.exports = permute

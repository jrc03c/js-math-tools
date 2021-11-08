const assert = require("./assert.js")
const isArray = require("./is-array.js")

function permute(arr) {
  assert(isArray(arr), "`arr` must be an array!")
  if (arr.length < 2) return arr
  const out = []

  arr.forEach((item, i) => {
    assert(
      !isArray(item),
      "It is not recommended to permute arrays of arrays. Weird things happen, and I haven't figured out how to account for such a scenario yet."
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

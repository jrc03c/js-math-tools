const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")
const max = require("./max.js")

function shape(arr) {
  assert(!isUndefined(arr), "You must pass an array into the `shape` function!")
  assert(isArray(arr), "You must pass an array into the `shape` function!")

  let out = [arr.length]
  const childrenAreArrays = arr.map(x => isArray(x))

  if (childrenAreArrays.indexOf(true) > -1) {
    assert(
      childrenAreArrays.indexOf(false) < 0,
      "The array passed into the `shape` function has some children that are not themselves arrays!"
    )

    const lengths = arr.map(x => x.length)
    const maxLength = max(lengths)

    lengths.forEach(function (length) {
      assert(
        length === maxLength,
        "The array passed into the `shape` function has some children of inconsistent length!"
      )
    })

    out = out.concat(shape(arr[0]))
  }

  return out
}

module.exports = shape

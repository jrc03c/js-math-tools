const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")
const int = require("./int.js")

function getValueAt(x, index) {
  assert(
    !isUndefined(x),
    "You must pass an array and an index into the `getValueAt` function!"
  )

  assert(
    isArray(x),
    "You must pass an array and an index into the `getValueAt` function!"
  )

  assert(
    isNumber(index) || isArray(index),
    "The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!"
  )

  if (isArray(index)) {
    assert(
      shape(index).length === 1,
      "The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!"
    )

    index.forEach(value => {
      assert(
        isNumber(value) && int(value) === value,
        "The index passed into the `getValueAt` function must be a positive integer or a one-dimensional array of positive integers!"
      )
    })

    assert(
      index.length <= shape(x).length,
      "The index passed into the `getValueAt` function has too many dimensions!"
    )
  }

  if (isNumber(index)) {
    assert(index < x.length, `The index ${index} is out of bounds!`)
    return x[index]
  } else {
    if (index.length > 1) {
      assert(index[0] < x.length, `The index ${index[0]} is out of bounds!`)
      return getValueAt(x[index[0]], index.slice(1))
    } else {
      return getValueAt(x, index[0])
    }
  }
}

module.exports = getValueAt

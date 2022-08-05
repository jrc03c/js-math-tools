const assert = require("./assert.js")
const copy = require("./copy.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")

function setValueAt(x, index, value) {
  assert(
    isArray(x),
    "The first argument passed into the `setValueAt` function must be an array!"
  )

  if (isNumber(index)) index = [index]

  assert(
    isArray(index),
    "The second argument passed into the `setValueAt` function must be an integer or an array of integers!"
  )

  const out = copy(x)
  let temp = out

  for (let i = 0; i < index.length - 1; i++) {
    temp = temp[index[i]]
  }

  temp[index[index.length - 1]] = value
  return out
}

module.exports = setValueAt

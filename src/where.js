const apply = require("./apply.js")
const assert = require("./assert.js")
const indexOf = require("./index-of.js")
const isArray = require("./is-array.js")
const isFunction = require("./is-function.js")
const setValueAt = require("./set-value-at.js")

function where(x, fn) {
  assert(
    isArray(x),
    "The first argument passed into the `where` function must be an array!"
  )

  assert(
    isFunction(fn),
    "The second argument passed into the `where` function must be a function!"
  )

  let temp = apply(x, fn)
  const out = []
  let count = 0
  let isDone = false

  while (!isDone) {
    const idx = indexOf(temp, true)

    if (idx) {
      out[count] = idx
      temp = setValueAt(temp, idx, null)
      count++
    } else {
      isDone = true
    }
  }

  if (count === 0) return null
  return out
}

module.exports = where

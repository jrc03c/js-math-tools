const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isFunction = require("./is-function.js")
const apply = require("./apply.js")
const indexOf = require("./index-of.js")
const setValueAt = require("./set-value-at.js")
const flatten = require("./flatten.js")

function where(x, fn) {
  assert(
    isArray(x),
    "The first argument passed into the `where` function must be an array!"
  )

  assert(
    isFunction(fn),
    "The second argument passed into the `where` function must be a function!"
  )

  const n = flatten(x).length
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

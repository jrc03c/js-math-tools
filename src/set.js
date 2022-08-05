const assert = require("./assert.js")
const flatten = require("./flatten.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")

function set(arr) {
  assert(!isUndefined(arr), "You must pass an array into the `set` function!")
  assert(isArray(arr), "You must pass an array into the `set` function!")

  const out = []
  const temp = {}

  flatten(arr).forEach(item => {
    const key =
      typeof item === "undefined"
        ? "undefined"
        : typeof item === "function"
        ? item.toString()
        : JSON.stringify(item)

    if (!temp[key]) out.push(item)
    temp[key] = true
  })

  return out
}

module.exports = set

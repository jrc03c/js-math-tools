const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const floor = require("./floor.js")
const { random } = require("./random.js")

function shuffle(arr) {
  assert(
    !isUndefined(arr),
    "You must pass an array into the `shuffle` function!"
  )

  assert(isArray(arr), "You must pass an array into the `shuffle` function!")

  const out = arr.slice()

  for (let i = 0; i < arr.length; i++) {
    const index1 = floor(random() * arr.length)
    const index2 = floor(random() * arr.length)
    const buffer = out[index1]
    out[index1] = out[index2]
    out[index2] = buffer
  }

  return out
}

module.exports = shuffle

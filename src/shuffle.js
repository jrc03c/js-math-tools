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

  const out = []
  let temp = arr.slice()

  for (let i = 0; i < arr.length; i++) {
    const index = parseInt(random() * temp.length)
    out.push(temp.splice(index, 1)[0])
  }

  return out
}

module.exports = shuffle

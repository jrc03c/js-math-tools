const { random } = require("./random.js")
const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isSeries = require("./is-series.js")

function shuffle(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return arr.shuffle(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(arr),
    "The `shuffle` function only works on arrays, Series, and DataFrames!"
  )

  const out = []
  const temp = arr.slice()

  for (let i = 0; i < arr.length; i++) {
    const index = parseInt(random() * temp.length)
    out.push(temp.splice(index, 1)[0])
  }

  return out
}

module.exports = shuffle

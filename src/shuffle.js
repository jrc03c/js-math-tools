const { random } = require("./random")
const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

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

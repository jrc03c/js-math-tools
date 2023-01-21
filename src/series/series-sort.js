const assert = require("../assert")
const isFunction = require("../is-function")
const isUndefined = require("../is-undefined")
const sort = require("../sort")
const transpose = require("../transpose")

function seriesSort(Series, series, fn) {
  fn = fn || ((a, b) => (a < b ? -1 : 1))

  assert(
    isUndefined(fn) || isFunction(fn),
    "You must pass undefined, null, or a comparison function as the second argument to the `sort` method!"
  )

  const pairs = transpose([series.values, series.index])

  const temp = sort(pairs, (aPair, bPair) => {
    return fn(aPair[0], bPair[0])
  })

  const newValues = []
  const newIndex = []

  temp.forEach(pair => {
    newValues.push(pair[0])
    newIndex.push(pair[1])
  })

  const out = new Series()
  out._values = newValues
  out._index = newIndex
  out.name = series.name
  return out
}

module.exports = seriesSort

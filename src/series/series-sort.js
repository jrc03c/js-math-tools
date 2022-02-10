const assert = require("../assert.js")
const isBoolean = require("../is-boolean.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const sort = require("../sort.js")
const transpose = require("../transpose.js")

function seriesSort(Series, series, direction) {
  assert(
    isBoolean(direction) || isString(direction) || isUndefined(direction),
    "The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false)."
  )

  let isAscending = true

  if (isUndefined(direction)) {
    isAscending = true
  }

  if (isString(direction)) {
    direction = direction.trim().toLowerCase()

    assert(
      direction === "ascending" || direction === "descending",
      "The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false)."
    )

    isAscending = direction === "ascending"
  }

  if (isBoolean(direction)) {
    isAscending = direction
  }

  let temp = transpose([series.values, series.index])

  temp = transpose(
    sort(temp, (a, b) => {
      if (a[0] === b[0]) return 0
      if (a[0] < b[0]) return isAscending ? -1 : 1
      if (a[0] > b[0]) return isAscending ? 1 : -1
    })
  )

  const out = new Series(temp[0])
  out.index = temp[1]
  out.name = series.name
  return out
}

module.exports = seriesSort

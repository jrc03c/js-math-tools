const sort = require("../sort")
const transpose = require("../transpose")

function seriesSortByIndex(Series, series) {
  let temp = transpose([series.values, series.index])

  temp = transpose(
    sort(temp, (a, b) => {
      if (a[1] === b[1]) return 0
      if (a[1] < b[1]) return -1
      if (a[1] > b[1]) return 1
    })
  )

  const out = new Series(temp[0])
  out.index = temp[1]
  out.name = series.name
  return out
}

module.exports = seriesSortByIndex

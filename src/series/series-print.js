const { copy } = require("../copy")
const range = require("../range")

function seriesPrint(series) {
  let temp = series.copy()
  const maxRows = typeof window === "undefined" ? 20 : 10

  if (temp.index.length > maxRows) {
    temp = temp.get(
      range(0, maxRows / 2).concat(
        range(temp.index.length - maxRows / 2, temp.index.length)
      )
    )

    const tempIndex = copy(temp.index)
    tempIndex.splice(parseInt(tempIndex.length / 2), 0, "...")
    temp.values.push("...")
    temp.index.push("...")
    temp = temp.get(tempIndex)
  }

  const out = {}

  temp.values.forEach((value, i) => {
    const obj = {}
    obj[temp.name] = value
    out[temp.index[i]] = obj
  })

  console.table(out)
  console.log("Shape:", series.shape, "\n")
  return series
}

module.exports = seriesPrint

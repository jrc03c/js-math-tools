const assert = require("../assert")
const isNumber = require("../is-number")
const isString = require("../is-string")
const isUndefined = require("../is-undefined")
const set = require("../set")

function seriesGet(series, indices) {
  if (isString(indices) || isNumber(indices)) indices = [indices]

  const types = set((indices || []).map(v => typeof v))

  assert(
    types.length <= 2,
    "Only whole numbers and/or strings are allowed in `get` arrays!"
  )

  if (types.length === 1) {
    assert(
      types[0] === "string" || types[0] === "number",
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    )
  }

  if (types.length === 2) {
    assert(
      types.indexOf("string") > -1,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    )

    assert(
      types.indexOf("number") > -1,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    )
  }

  if (!isUndefined(indices)) {
    indices = indices.map(i => {
      if (typeof i === "string") {
        assert(series.index.indexOf(i) > -1, `Index "${i}" does not exist!`)
        return i
      }

      if (typeof i === "number") {
        assert(i >= 0, `Index ${i} is out of bounds!`)
        assert(parseInt(i) === i, `Indices must be integers!`)
        assert(i < series.index.length, `Index ${i} is out of bounds!`)
        return series.index[i]
      }
    })
  }

  return series.getSubsetByNames(indices)
}

module.exports = seriesGet

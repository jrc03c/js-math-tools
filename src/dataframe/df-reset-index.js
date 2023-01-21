const leftPad = require("../helpers/left-pad")
const range = require("../range")

function dfResetIndex(df, shouldSkipCopying) {
  const out = shouldSkipCopying ? df : df.copy()

  out.index = range(0, df.shape[0]).map(i => {
    return "row" + leftPad(i, (out.index.length - 1).toString().length)
  })

  return out
}

module.exports = dfResetIndex

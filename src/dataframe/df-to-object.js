function dfToObject(df) {
  const out = {}

  df.values.forEach((row, i) => {
    const temp = {}

    row.forEach((value, j) => {
      temp[df.columns[j]] = value
    })

    out[df.index[i]] = temp
  })

  return out
}

module.exports = dfToObject

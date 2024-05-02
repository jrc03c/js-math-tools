function dfToObject(df) {
  const out = {}

  df.columns.forEach(col => {
    out[col] = df.get(col).values
  })

  return out
}

module.exports = dfToObject

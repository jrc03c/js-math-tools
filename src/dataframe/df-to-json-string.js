function dfToJSONString(df, axis) {
  return JSON.stringify(df.toObject(axis))
}

module.exports = dfToJSONString

const isBoolean = require("../is-boolean.js")
const isObject = require("../is-object.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const MathError = require("../math-error.js")

function toCSVString(df, shouldIncludeIndex) {
  shouldIncludeIndex = (() => {
    if (isUndefined(shouldIncludeIndex)) {
      return true
    } else if (isBoolean(shouldIncludeIndex)) {
      return shouldIncludeIndex
    }

    throw new MathError(
      "The `shouldIncludeIndex` parameter of the `toCSVString` method must be a boolean!"
    )
  })()

  const index = [""].concat(df.index)

  const out = [df.columns]
    .concat(df.values)
    .map((row, i) => {
      const temp = shouldIncludeIndex ? [index[i]] : []

      return temp
        .concat(row)
        .map(value => {
          if (isString(value)) {
            return JSON.stringify(value)
          } else if (isObject(value)) {
            return JSON.stringify(JSON.stringify(value))
          } else if (isUndefined(value)) {
            return ""
          } else {
            return value.toString()
          }
        })
        .join(",")
    })
    .join("\n")

  return out
}

module.exports = toCSVString

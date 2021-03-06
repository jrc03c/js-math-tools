const assert = require("../assert.js")
const dfFromCSVString = require("./df-from-csv-string.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const MathError = require("../math-error.js")

async function fromCSV(
  DataFrame,
  path,
  encoding,
  hasHeaderRow,
  hasIndexColumn,
  fieldDelimiter,
  stringDelimiter
) {
  encoding = (() => {
    if (!isUndefined(encoding)) {
      assert(
        isString(encoding),
        "The `encoding` parameter of the `fromCSV` method must be a string (e.g., 'utf8')!"
      )

      return encoding
    } else {
      return "utf8"
    }
  })()

  const raw = await (async () => {
    // browser
    try {
      const response = await fetch(path)
      return await response.text()
    } catch (e) {}

    // node
    try {
      const fs = require("fs")
      return fs.readFileSync(path, encoding)
    } catch (e) {}

    throw new MathError(`The path "${path}" could not be loaded!`)
  })()

  return dfFromCSVString(
    DataFrame,
    raw,
    hasHeaderRow,
    hasIndexColumn,
    fieldDelimiter,
    stringDelimiter
  )
}

module.exports = fromCSV

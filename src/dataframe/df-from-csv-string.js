const MathError = require("../math-error.js")
const assert = require("../assert.js")
const isArray = require("../is-array.js")
const isBoolean = require("../is-boolean.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const max = require("../max.js")
const range = require("../range.js")

function fromCSVString(
  DataFrame,
  raw,
  hasHeaderRow,
  hasIndexColumn,
  fieldDelimiter,
  stringDelimiter
) {
  hasHeaderRow = (() => {
    if (isUndefined(hasHeaderRow)) {
      return false
    } else if (isBoolean(hasHeaderRow)) {
      return hasHeaderRow
    }

    throw new MathError(
      "The `hasHeaderRow` parameter of the `fromCSV` method must be a boolean!"
    )
  })()

  hasIndexColumn = (() => {
    if (isUndefined(hasIndexColumn)) {
      return false
    } else if (isBoolean(hasIndexColumn)) {
      return hasIndexColumn
    }

    throw new MathError(
      "The `hasIndexColumn` parameter of the `fromCSV` method must be a boolean!"
    )
  })()

  fieldDelimiter = (() => {
    const errorMessage =
      "The `fieldDelimiter` parameter of the `fromCSV` method must be one of:\n\n1) a single-character string (e.g., ',')\n2) an array containing two single-character strings, one each for a left delimiter and a right delimiter (e.g., ['<', '>'])"

    if (isUndefined(fieldDelimiter)) {
      return ","
    } else if (isString(fieldDelimiter)) {
      assert(fieldDelimiter.length === 1, errorMessage)
      return fieldDelimiter
    } else if (isArray(fieldDelimiter)) {
      assert(fieldDelimiter.length === 2, errorMessage)
      assert(fieldDelimiter[0].length === 1, errorMessage)
      assert(fieldDelimiter[1].length === 1, errorMessage)
      return fieldDelimiter
    } else {
      throw new MathError(errorMessage)
    }
  })()

  stringDelimiter = (() => {
    const errorMessage =
      "The `stringDelimiter` parameter of the `fromCSV` method must be one of:\n\n1) a single-character string (e.g., '\"')\n2) an array containing two single-character strings, one each for a left delimiter and a right delimiter (e.g., ['“', '”'])"

    if (isUndefined(stringDelimiter)) {
      return '"'
    } else if (isString(stringDelimiter)) {
      assert(stringDelimiter.length === 1, errorMessage)
      return stringDelimiter
    } else if (isArray(stringDelimiter)) {
      assert(stringDelimiter.length === 2, errorMessage)
      assert(stringDelimiter[0].length === 1, errorMessage)
      assert(stringDelimiter[1].length === 1, errorMessage)
      return stringDelimiter
    } else {
      throw new MathError(errorMessage)
    }
  })()

  const out = (() => {
    const lines = raw.split("\n").filter(line => line.length > 0)

    const rows = lines.map(line => {
      const row = []
      let temp = ""
      let isInQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]

        // if matches a backslash, then skip the next character
        if (char.match(/\\/g)) {
          i++
        }

        // if matches a string delimiter, then toggle whether or not we're in a string (i.e., quote)
        else if (isArray(stringDelimiter) && char === stringDelimiter[0]) {
          isInQuotes = true
        } else if (isArray(stringDelimiter) && char === stringDelimiter[1]) {
          isInQuotes = false
        } else if (isString(stringDelimiter) && char === stringDelimiter) {
          isInQuotes = !isInQuotes
        }

        // if matches a field delimiter, then (if we're not in quotes) add the accumulated value to the row
        else if (
          (isArray(fieldDelimiter) && char === fieldDelimiter[0]) ||
          (isArray(fieldDelimiter) && char === fieldDelimiter[1]) ||
          (isString(fieldDelimiter) && char === fieldDelimiter)
        ) {
          if (!isInQuotes) {
            const value = temp

            try {
              const parsedValue = JSON.parse(value)

              if (isArray(parsedValue)) {
                row.push(value.trim())
              } else {
                row.push(parsedValue)
              }
            } catch (e) {
              row.push(value.trim())
            }

            temp = ""
          } else {
            temp += char
          }
        }

        // for all other characters, just accumulate them
        else {
          temp += char
        }
      }

      if (temp.length > 0) {
        const value = temp

        try {
          const parsedValue = JSON.parse(value)

          if (isArray(parsedValue)) {
            row.push(value.trim())
          } else {
            row.push(parsedValue)
          }
        } catch (e) {
          row.push(value.trim())
        }
      }

      return row
    })

    const columns = (() => {
      const temp = hasHeaderRow
        ? rows.shift()
        : range(0, rows[0].length).map(i => "col" + i)

      if (hasIndexColumn) {
        temp.shift()
      }

      return temp
    })()

    const index = (() => {
      const temp = hasIndexColumn
        ? rows.map(row => row.shift())
        : range(0, rows.length).map(i => "row" + i)

      return temp
    })()

    const maxRowLength = max(rows.map(row => row.length))

    const temp = new DataFrame(
      rows.map(row => {
        row.length = maxRowLength
        return row
      })
    )

    if (hasHeaderRow) temp.columns = columns
    if (hasIndexColumn) temp.index = index
    return temp
  })()

  return out
}

module.exports = fromCSVString

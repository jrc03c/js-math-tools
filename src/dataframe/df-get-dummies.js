const assert = require("../assert")
const isString = require("../is-string")
const isUndefined = require("../is-undefined")
const set = require("../set")
const sort = require("../sort")

function camelify(text) {
  const temp = text.toLowerCase()
  let out = ""

  for (let i = 0; i < temp.length; i++) {
    const char = temp[i]

    if (char.match(/[a-z0-9]/g)) {
      out += char
    } else {
      out += " "
    }
  }

  const words = out.split(" ").filter(word => word.length > 0)

  return (
    words[0] +
    words
      .slice(1)
      .map(word => word[0].toUpperCase() + word.substring(1))
      .join("")
  )
}

function dfGetDummies(DataFrame, df, columns) {
  if (isUndefined(columns)) {
    columns = df.columns
  } else if (isString(columns)) {
    columns = [columns]
  }

  const temp = {}

  columns.forEach(col => {
    assert(
      isString(col),
      "You must pass either a string or a one-dimensional array of strings into the `getDummies` (AKA `oneHotEncode`) method!"
    )

    const colIndex = df.columns.indexOf(col)

    assert(
      colIndex > -1,
      `The given DataFrame does not have a column called "${col}"!`
    )

    const values = df.values.map(row => row[colIndex])
    const valuesSet = sort(set(values))

    values.forEach(value => {
      valuesSet.forEach(orig => {
        const colName = col + "_" + camelify(orig.toString())

        if (!temp[colName]) {
          temp[colName] = []
        }

        if (value === orig) {
          temp[colName].push(1)
        } else {
          temp[colName].push(0)
        }
      })
    })
  })

  const out = new DataFrame(temp)
  out.index = df.index
  return out
}

module.exports = dfGetDummies

const isString = require("../is-string")
const range = require("../range")

function dfPrint(DataFrame, Series, df) {
  function truncate(s, maxLength) {
    if (isString(s)) {
      if (s.length > maxLength) {
        return s.substring(0, maxLength - 3) + "..."
      } else {
        return s
      }
    } else {
      return s
    }
  }

  if (df.isEmpty) {
    console.table({})
    console.log("Shape:", [0, 0], "\n")
    return df
  }

  const maxRows = typeof window === "undefined" ? 20 : 10
  const halfMaxRows = parseInt(maxRows / 2)

  const maxColumns =
    typeof process === "undefined"
      ? 10
      : Math.floor(process.stdout.columns / 24) - 1

  const halfMaxColumns = parseInt(maxColumns / 2)

  const tempRows =
    maxRows > df.index.length
      ? null
      : range(0, halfMaxRows).concat(
          range(df.index.length - halfMaxRows, df.index.length)
        )

  const tempColumns =
    maxColumns > df.columns.length
      ? null
      : range(0, halfMaxColumns).concat(
          range(df.columns.length - halfMaxColumns, df.columns.length)
        )

  let temp = df.get(tempRows, tempColumns)

  if (temp instanceof Series) {
    if (df.shape[0] === 1) {
      // data is row-shaped
      temp = new DataFrame([temp.values])
      temp.index = df.index
      temp.columns = new Series(df.columns).get(tempColumns).values
    } else if (df.shape[1] === 1) {
      // data is column-shaped
      temp = new DataFrame([temp.values]).transpose()
      temp.index = new Series(df.index).get(tempRows).values
      temp.columns = df.columns
    }
  }

  if (maxRows <= df.index.length) {
    temp._index.splice(halfMaxRows, 0, "...")
    temp._values.splice(
      halfMaxRows,
      0,
      range(0, temp.columns.length).map(() => "...")
    )
  }

  if (maxColumns <= df.columns.length) {
    temp._columns.splice(halfMaxColumns, 0, "...")

    temp._values = temp._values.map(row => {
      row.splice(halfMaxColumns, 0, "...")
      return row
    })
  }

  const maxLength = 28

  if (temp instanceof Series) {
    temp.values = temp.values.map(value => truncate(value, maxLength))
    temp.name = truncate(temp.name, maxLength)
    temp.index = temp.index.map(row => truncate(row, maxLength))
  } else {
    temp.values = temp.values.map(row => {
      return row.map(value => truncate(value, maxLength))
    })

    temp.columns = temp.columns.map(col => truncate(col, maxLength))
    temp.index = temp.index.map(row => truncate(row, maxLength))
  }

  console.table(temp.toObject())
  console.log("Shape:", df.shape, "\n")
  return df
}

module.exports = dfPrint

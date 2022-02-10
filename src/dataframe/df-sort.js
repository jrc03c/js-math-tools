const { random } = require("../random.js")
const assert = require("../assert.js")
const flatten = require("../flatten.js")
const isArray = require("../is-array.js")
const isBoolean = require("../is-boolean.js")
const isNumber = require("../is-number.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const range = require("../range.js")
const shape = require("../shape.js")
const sort = require("../sort.js")

function dfSort(df, cols, directions) {
  // temporarily assign index as column in dataframe
  let out = df.copy()
  const indexID = random().toString()
  out = out.assign(indexID, out.index)

  if (isUndefined(cols)) {
    cols = [indexID]
    directions = [true]
  }

  if (isNumber(cols) || isString(cols)) {
    cols = [cols]

    if (isBoolean(directions) || isString(directions)) directions = [directions]
  }

  assert(
    isArray(cols),
    "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
  )

  assert(
    shape(cols).length === 1,
    "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
  )

  if (isUndefined(directions)) directions = range(0, cols.length).map(i => true)

  assert(
    isArray(directions),
    "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
  )

  assert(
    shape(directions).length === 1,
    "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
  )

  assert(
    cols.length === directions.length,
    "The arrays passed into the `sort` method must be equal in length."
  )

  // convert all columns to indices
  cols = cols.map(col => {
    assert(
      isString(col) || isNumber(col),
      "Column references can either be column names (as strings) or column indices (as whole numbers)."
    )

    if (isString(col)) {
      const index = out.columns.indexOf(col)
      assert(index > -1, `The column "${col}" does not exist!`)
      return index
    }

    if (isNumber(col)) {
      assert(parseInt(col) === col, "Column indices must be whole numbers!")
      assert(col >= 0, `The column index ${col} is out of bounds!`)
      assert(col < out.columns.length, `The index ${col} is out of bounds!`)
      return col
    }
  })

  // convert all directions to booleans
  directions = directions.map(dir => {
    assert(
      isString(dir) || isBoolean(dir),
      "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
    )

    if (isString(dir)) {
      const value = dir.trim().toLowerCase()

      assert(
        value === "ascending" || value === "descending",
        "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
      )

      return value === "ascending"
    }

    if (isBoolean(dir)) {
      return dir
    }
  })

  // sort
  out.values = sort(out.values, (a, b) => {
    let counter = 0

    while (a[cols[counter]] === b[cols[counter]] && counter < cols.length) {
      counter++
    }

    const isAscending = directions[counter]
    if (a[cols[counter]] === b[cols[counter]]) return 0
    if (a[cols[counter]] < b[cols[counter]]) return isAscending ? -1 : 1
    if (a[cols[counter]] > b[cols[counter]]) return isAscending ? 1 : -1
  })

  out.index = flatten(out.get(null, indexID).values)
  out = out.dropColumns(indexID)
  return out
}

module.exports = dfSort

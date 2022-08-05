const MathError = require("../math-error.js")
const assert = require("../assert.js")
const copy = require("../copy.js")
const isArray = require("../is-array.js")
const isEqual = require("../is-equal.js")
const leftPad = require("../helpers/left-pad.js")
const shape = require("../shape.js")
const sort = require("../sort.js")

function dfJoin(DataFrame, Series, df, data) {
  // if joining a Series
  if (data instanceof Series) {
    assert(
      isEqual(sort(data.index), sort(df.index)),
      "The index of the incoming Series must match the index of the target DataFrame!"
    )

    const newValues = copy(df.values)

    df.index.forEach((row, i) => {
      const value = data.get(row)
      newValues[i].push(value)
    })

    const out = new DataFrame(newValues)
    out.columns = df.columns.concat([data.name])
    return out
  }

  // if joining a DataFrame
  else if (data instanceof DataFrame) {
    assert(
      isEqual(sort(data.index), sort(df.index)),
      "The index of the incoming DataFrame must match the index of the target DataFrame!"
    )

    const newValues = copy(df.values)

    df.index.forEach((rowName, i) => {
      const row = data.values[data.index.indexOf(rowName)]
      newValues[i] = newValues[i].concat(row)
    })

    const out = new DataFrame(newValues)
    out.columns = df.columns.concat(data.columns)
    return out
  }

  // if joining an array
  else if (isArray(data)) {
    const dataShape = shape(data)

    // if joining a vector
    if (dataShape.length === 1) {
      assert(
        data.length === df.values.length,
        "When passing a 1-dimensional array into the `join` method, the array must have the same length as the number of rows in the target DataFrame!"
      )

      const temp = new Series(data)
      temp.index = df.index
      temp.name =
        "col" + leftPad(df.columns.length, df.columns.length.toString().length)
      return dfJoin(DataFrame, Series, df, temp)
    }

    // if joining a matrix
    else if (dataShape.length === 2) {
      assert(
        data.length === df.values.length,
        "When passing a 2-dimensional array into the `join` method, each column of the array must have the same length as the number of rows in the target DataFrame!"
      )

      const temp = new DataFrame(data)
      temp.index = df.index
      temp.columns = temp.columns.map(
        (col, i) =>
          "col" +
          leftPad(df.columns.length + i, df.columns.length.toString().length)
      )

      return dfJoin(DataFrame, Series, df, temp)
    }

    // otherwise, throw an error
    else {
      throw new MathError(
        "When passing an array into the `join` method, the array must be 1- or 2-dimensional! If 1-dimensional, it must be as long as the number of rows of the target DataFrame. If 2-dimensional, each column must be as long as the number of rows in the target DataFrame."
      )
    }
  }

  // otherwise, throw an error
  else {
    throw new MathError(
      "Only Series, DataFrames, and 1- or 2-dimensional arrays can be passed into the `join` method!"
    )
  }
}

module.exports = dfJoin

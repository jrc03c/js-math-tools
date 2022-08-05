const MathError = require("../math-error.js")
const assert = require("../assert.js")
const copy = require("../copy.js")
const isArray = require("../is-array.js")
const isEqual = require("../is-equal.js")
const shape = require("../shape.js")
const sort = require("../sort.js")

function dfAppend(DataFrame, Series, df, data) {
  // if appending a Series
  if (data instanceof Series) {
    assert(
      isEqual(sort(df.columns), sort(data.index)),
      "The index of the incoming Series must match the columns of the target DataFrame!"
    )

    const newValues = copy(df.values)
    newValues.push(df.columns.map(col => data.get(col)))

    const out = new DataFrame(newValues)
    out.columns = df.columns

    const shouldSkipCopying = true
    return out.resetIndex(shouldSkipCopying)
  }

  // if appending a DataFrame
  else if (data instanceof DataFrame) {
    assert(
      isEqual(sort(df.columns), sort(data.columns)),
      "The columns of the incoming DataFrame must match the columns of the target DataFrame!"
    )

    const newValues = copy(df.values)

    data.values.forEach(row => {
      newValues.push(
        df.columns.map(col => {
          const colIndex = data.columns.indexOf(col)
          return row[colIndex]
        })
      )
    })

    const out = new DataFrame(newValues)
    out.columns = df.columns

    const shouldSkipCopying = true
    return out.resetIndex(shouldSkipCopying)
  }

  // if appending an array
  else if (isArray(data)) {
    const dataShape = shape(data)

    // if appending a vector
    if (dataShape.length === 1) {
      assert(
        data.length === df.columns.length,
        "When passing a 1-dimensional array into the `append` method, the array must have the same length as the number of columns in the target DataFrame!"
      )

      const temp = new Series(data)
      temp.index = df.columns
      return dfAppend(DataFrame, Series, df, temp)
    }

    // if appending a matrix
    else if (dataShape.length === 2) {
      assert(
        dataShape[1] === df.columns.length,
        "When passing a 2-dimensional array into the `append` method, each row of the array must have the same length as the number of columns in the target DataFrame!"
      )

      const temp = new DataFrame(data)
      temp.columns = df.columns
      return dfAppend(DataFrame, Series, df, temp)
    }

    // otherwise, throw an error
    else {
      throw new MathError(
        "When passing an array into the `append` method, the array must be 1- or 2-dimensional! If 1-dimensional, it must be as long as the number of columns in the target DataFrame. If 2-dimensional, each row must be as long as the number of columns in the target DataFrame."
      )
    }
  }

  // otherwise, throw an error
  else {
    throw new MathError(
      "Only Series, DataFrames, and 1- or 2-dimensional arrays can be passed into the `append` method!"
    )
  }
}

module.exports = dfAppend

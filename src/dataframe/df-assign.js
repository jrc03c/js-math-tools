const isUndefined = require("../is-undefined.js")
const assert = require("../assert.js")
const isString = require("../is-string.js")
const isSeries = require("./is-series.js")
const isArray = require("../is-array.js")
const shape = require("../shape.js")
const isObject = require("../is-object.js")
const isEqual = require("../is-equal.js")
const transpose = require("../transpose.js")

function dfAssign(df, p1, p2) {
  let name, obj

  if (isUndefined(p2)) {
    obj = p1

    assert(
      !isArray(obj),
      "When using only one parameter for the `assign` method, the parameter must be an object or a Series."
    )
  } else {
    name = p1
    obj = p2

    assert(
      isString(name),
      "When using two parameters for the `assign` method, the first parameter must be a string."
    )

    assert(
      isSeries(obj) || (isArray(obj) && shape(obj).length === 1),
      "When using two parameters for the `assign` method, the second parameter must be a Series or a 1-dimensional array."
    )
  }

  assert(
    isObject(obj) || isSeries(obj) || (isArray(obj) && shape(obj).length === 1),
    "An object, Series, or 1-dimensional array must be passed into the `assign` method."
  )

  if (isSeries(obj)) {
    const temp = {}

    assert(
      df.isEmpty || isEqual(obj.index, df.index),
      "The index of the new data does not match the index of the DataFrame."
    )

    temp[name || obj.name] = obj.values
    return df.assign(temp)
  } else if (isArray(obj)) {
    const temp = {}
    temp[name || "data"] = obj
    return df.assign(temp)
  } else {
    let out = df.copy()
    let outShape = out.shape

    Object.keys(obj).forEach(col => {
      const values = obj[col]

      assert(
        isArray(values),
        "Each key-value pair must be (respectively) a string and a 1-dimensional array of values."
      )

      assert(
        shape(values).length === 1,
        "Each key-value pair must be (respectively) a string and a 1-dimensional array of values."
      )

      if (out.isEmpty) {
        out.values = transpose([values])
        out.columns = [col]
        outShape = out.shape
      } else {
        assert(
          values.length === outShape[0],
          `Column "${col}" in the new data is not the same length as the other columns in the original DataFrame.`
        )

        let colIndex = out.columns.indexOf(col)

        if (colIndex < 0) {
          out.columns.push(col)
          colIndex = out.columns.indexOf(col)
        }

        out.values.forEach((row, i) => {
          row[colIndex] = values[i]
        })
      }
    })

    return out
  }
}

module.exports = dfAssign

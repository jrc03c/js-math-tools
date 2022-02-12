const assert = require("../assert.js")
const isArray = require("../is-array.js")
const isObject = require("../is-object.js")
const isSeries = require("../helpers/is-series.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const shape = require("../shape.js")
const copy = require("../copy.js")
const MathError = require("../math-error.js")
const sort = require("../sort.js")

function dfAssign(DataFrame, df, p1, p2) {
  // options:
  // assign(object)
  // assign(string, array or series)

  const obj = (() => {
    const out = {}

    // one argument
    if (isUndefined(p2)) {
      if (isSeries(p1)) {
        const temp = df.index.map(rowName => p1.get(rowName))

        assert(
          temp.length === df.index.length,
          "Each column of values to be assigned must have the same length as the number of rows in the target DataFrame!"
        )

        out[p1.name] = temp
      } else if (isObject(p1)) {
        Object.keys(p1).forEach(key => {
          const values = p1[key]

          if (isSeries(values)) {
            const temp = df.index.map(rowName => values.get(rowName))

            assert(
              temp.length === df.index.length,
              "Each column of values to be assigned must have the same length as the number of rows in the target DataFrame!"
            )

            out[key] = temp
          } else if (isArray(values)) {
            assert(
              shape(values).length === 1,
              "When using a single argument for the `assign` method, the argument must be either (1) a Series, or (2) an object consisting of key-value pairs where each key is a string representing a column name and each value is a one-dimensional array or Series!"
            )

            assert(
              values.length === df.index.length,
              "Each column of values to be assigned must have the same length as the number of rows in the target DataFrame!"
            )

            out[key] = values
          } else {
            throw new MathError(
              "When using a single argument for the `assign` method, the argument must be either (1) a Series, or (2) an object consisting of key-value pairs where each key is a string representing a column name and each value is a one-dimensional array or Series!"
            )
          }
        })
      } else {
        throw new MathError(
          "When using a single argument for the `assign` method, the argument must be either (1) a Series, or (2) an object consisting of key-value pairs where each key is a string representing a column name and each value is a one-dimensional array or Series!"
        )
      }
    }

    // two arguments
    else {
      assert(
        isString(p1),
        "When using two arguments for the `assign` method, the first argument must be a string representing a column name, and the second argument must be a one-dimensional array or Series!"
      )

      if (isSeries(p2)) {
        const temp = df.index.map(rowName => p2.get(rowName))

        assert(
          temp.length === df.index.length,
          "The one-dimensional array or Series to be assigned must have the same length as the number of rows in the target DataFrame!"
        )

        out[p1] = temp
      } else if (isArray(p2)) {
        assert(
          shape(p2).length === 1,
          "When using two arguments for the `assign` method, the first argument must be a string representing a column name, and the second argument must be a one-dimensional array or Series!"
        )

        assert(
          p2.length === df.index.length,
          "The one-dimensional array or Series to be assigned must have the same length as the number of rows in the target DataFrame!"
        )

        out[p1] = p2
      } else {
        throw new MathError(
          "When using two arguments for the `assign` method, the first argument must be a string representing a column name, and the second argument must be a one-dimensional array or Series!"
        )
      }
    }

    return out
  })()

  const columns = df.columns
  const index = df.index
  const values = copy(df.values)
  const newColumnNames = sort(Object.keys(obj))

  values.forEach((row, i) => {
    newColumnNames.forEach(colName => {
      row.push(obj[colName][i])
    })
  })

  const out = new DataFrame(values)
  out.columns = columns.concat(newColumnNames)
  out.index = index
  return out
}

module.exports = dfAssign

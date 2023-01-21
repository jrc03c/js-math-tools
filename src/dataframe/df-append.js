const assert = require("../assert")
const isArray = require("../is-array")
const isDataFrame = require("../is-dataframe")
const isJagged = require("../is-jagged")
const isSeries = require("../is-series")
const isUndefined = require("../is-undefined")
const MathError = require("../math-error")
const ndarray = require("../ndarray")
const range = require("../range")
const set = require("../set")
const shape = require("../shape")

function dfAppend(df, x, axis) {
  if (isUndefined(axis)) {
    axis = 0
  }

  assert(
    axis === 0 || axis === 1 || axis === "vertical" || axis === "horizontal",
    'The only valid axis values for use when appending data to a DataFrame are 0, 1, "vertical", and "horizontal". Note that 0 == "horizontal" and 1 == "vertical".'
  )

  // appending arrays is relatively straightforward: either all of the rows in
  // `x` are appended to the `values` in the current DataFrame, or each row in
  // `x` is concatenated with each corresponding row in `values`
  if (isArray(x)) {
    assert(
      !isJagged(x),
      "The array of data you're trying to append to this DataFrame is jagged!"
    )

    const xShape = shape(x)

    // if `x` is a vector...
    if (xShape.length === 1) {
      // if the `axis` is 0, then we'll assume that `x` must be a row that we
      // should append to the bottom of the stack of rows in `values`; and if
      // `x` is longer than the width of the current DataFrame, then we'll have
      // to extend all of the rows to keep the shape square; or if `x` is
      // shorter than the width of the current DataFrame, then we'll extend `x`
      // until it's the right length
      if (axis === 0) {
        const out = df.copy()
        out._values.push(x)

        const maxRowLength = Math.max(df.shape[1], xShape[0])
        out._values.forEach(row => {
          while (row.length < maxRowLength) {
            row.push(undefined)
          }
        })

        while (out._index.length < out._values.length) {
          out._index.push("row" + out._index.length)
        }

        while (out._columns.length < maxRowLength) {
          out._columns.push("col" + out._columns.length)
        }

        return out
      }

      // otherwise, if the `axis` is 1, then we'll assume that `x` is a column
      // that should be appended to the right of the existing columns; and if
      // `x` is longer than the height of the current DataFrame, then we'll
      // have to extend all of the columns to keep the shape square; or if `x`
      // is shorter than the height of the current DataFrame, then we'll extend
      // `x` until it's the right height
      else {
        const maxColLength = Math.max(df.shape[0], xShape[0])
        const out = df.copy()

        range(0, maxColLength).forEach(i => {
          if (i >= out._values.length) {
            out._values.push(ndarray(df.shape[1]))
          }

          out._values[i].push(x[i])
        })

        while (out._index.length < out._values.length) {
          out._index.push("row" + out._index.length)
        }

        while (out._columns.length < out._values[0].length) {
          out._columns.push("col" + out._columns.length)
        }

        return out
      }
    }

    // otherwise, if `x` is a matrix...
    else if (xShape.length === 2) {
      // if the `axis` is 0, then we'll assume that `x` contains rows that
      // ought to be stacked beneath the rows in the current DataFrame; and if
      // `x` is wider than the width of the current DataFrame, then we'll have
      // to extend the rows of the current DataFrame to keep the shape square;
      // or if the current DataFrame is wider than `x`, then we'll extend the
      // rows of `x` until they're the right length
      if (axis === 0) {
        const maxRowLength = Math.max(
          ...x.map(row => row.length).concat([df.shape[1]])
        )

        const out = df.copy()

        out._values = out._values.concat(x).map(row => {
          while (row.length < maxRowLength) {
            row.push(undefined)
          }

          return row
        })

        while (out._index.length < out._values.length) {
          out._index.push("row" + out._index.length)
        }

        while (out._columns.length < maxRowLength) {
          out._columns.push("col" + out._columns.length)
        }

        return out
      }

      // otherwise, if the `axis` is 1, then we'll assume that `x` contains
      // rows that ought to be stacked to the right of the rows in the current
      // DataFrame; and if `x` is taller than the height of the current
      // DataFrame, then we'll have to extend the columns of the current
      // DataFrame to keep the shape square; or if the current DataFrame is
      // taller than `x`, then we'll extend the columns of `x` until they're
      // the right length
      else {
        const maxRowLength = Math.max(...x.map(row => row.length)) + df.shape[1]
        const maxColLength = Math.max(df.shape[0], xShape[0])
        const out = df.copy()

        range(0, maxColLength).forEach(i => {
          if (i >= out._values.length) {
            out._values.push(ndarray(df.shape[1]))
          }

          out._values[i] = out._values[i].concat(x[i])

          while (out._values[i].length < maxRowLength) {
            out._values[i].push(undefined)
          }
        })

        while (out._index.length < out._values.length) {
          out._index.push("row" + out._index.length)
        }

        while (out._columns.length < maxRowLength) {
          out._columns.push("col" + out._columns.length)
        }

        return out
      }
    } else {
      throw new MathError(
        "Only 1- and 2-dimensional arrays can be appended to a DataFrame!"
      )
    }
  }

  // appending a Series is virtually the same as appending a vector but with
  // two differences:
  //   1) `x` (the incoming Series) will have its own index, and the values of
  //      that index can't conflict with the names of the current DataFrame's
  //      rows or columns; therefore, any conflicting index names appearing in
  //      `x` must be renamed (by appending a "(2)" to the end of each) before
  //      returning the new DataFrame, and...
  //   2) the name of the Series will be used as its row or column name in the
  //      new DataFrame (e.g., if the `axis` is 0, then `x`'s name will
  //      correspond to the new row containing `x`'s values)
  else if (isSeries(x)) {
    const out = dfAppend(df, x.values, axis)

    if (axis === 0) {
      out.index[out.index.length - 1] =
        out.index.indexOf(x.name) > -1 ? x.name + " (2)" : x.name
    } else {
      out.columns[out.columns.length - 1] =
        out.columns.indexOf(x.name) > -1 ? x.name + " (2)" : x.name
    }

    return out
  }

  // appending a DataFrame is slightly trickier than appending a Series, but
  // all of the same ideas apply
  else if (isDataFrame(x)) {
    if (axis === 0) {
      const out = df.copy()
      const maxRowLength = set(out._columns.concat(x._columns)).length

      out._values.forEach(row => {
        while (row.length < maxRowLength) {
          row.push(undefined)
        }
      })

      x.apply(row => {
        const rowCopy = row.copy()
        const temp = []

        out._columns.forEach(col => {
          const index = rowCopy._index.indexOf(col)

          if (index > -1) {
            temp.push(rowCopy._values[index])
            rowCopy._values.splice(index, 1)
            rowCopy._index.splice(index, 1)
          } else {
            temp.push(undefined)
          }
        })

        out._values.push(temp.concat(rowCopy._values))
      }, 1)

      out._columns = out._columns.concat(
        x._columns.filter(c => out._columns.indexOf(c) < 0)
      )

      while (out._index.length < out._values.length) {
        const newRowName = "row" + out._index.length

        out._index.push(
          newRowName + (df._index.indexOf(newRowName) > -1 ? " (2)" : "")
        )
      }

      return out
    } else {
      const out = df.copy()

      out._index.forEach((rowName, i) => {
        const xIndex = x._index.indexOf(rowName)

        if (xIndex > -1) {
          out._values[i] = out._values[i].concat(x._values[xIndex])
        } else {
          out._values[i] = out._values[i].concat(ndarray(x.shape[1]))
        }
      })

      x._index.forEach((rowName, i) => {
        const outIndex = out._index.indexOf(rowName)

        if (outIndex < 0) {
          out._index.push(rowName)
          out._values.push(ndarray(out._columns.length).concat(x._values[i]))
        }
      })

      out._columns = out._columns.concat(
        x._columns.map(c => c + (out._columns.indexOf(c) > -1 ? " (2)" : ""))
      )

      return out
    }
  } else {
    throw new MathError(
      "Only 1- or 2-dimensional arrays, Series, and DataFrames can be appended to a DataFrame!"
    )
  }
}

module.exports = dfAppend

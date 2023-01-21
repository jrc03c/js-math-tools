const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const ndarray = require("./ndarray")
const reverse = require("./reverse")
const shape = require("./shape")

function transpose(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return arr.transpose()
  }

  assert(
    isArray(arr),
    "The `transpose` function only works on arrays, Series, and DataFrames!"
  )

  const theShape = shape(arr)

  assert(
    theShape.length <= 2,
    "I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!"
  )

  if (theShape.length === 1) {
    return reverse(arr)
  } else if (theShape.length === 2) {
    const out = ndarray(reverse(theShape))

    for (let row = 0; row < theShape[0]; row++) {
      for (let col = 0; col < theShape[1]; col++) {
        out[col][row] = arr[row][col]
      }
    }

    return out
  }
}

module.exports = transpose

const { DataFrame, Series } = require("./dataframe")
const isArray = require("./is-array.js")
const isDataFrame = require("./is-dataframe.js")
const isJagged = require("./is-jagged.js")
const isSeries = require("./is-series.js")
const shape = require("./shape.js")

function print() {
  Object.keys(arguments).forEach(key => {
    const x = arguments[key]

    if (isArray(x)) {
      if (!isJagged(x)) {
        const xShape = shape(x)

        if (xShape.length === 1) {
          new Series(x).print()
        } else if (xShape.length == 2) {
          new DataFrame(x).print()
        } else {
          console.log(x)
        }
      } else {
        console.log(x)
      }
    } else if (isDataFrame(x) || isSeries(x)) {
      x.print()
    } else {
      console.log(x)
    }
  })
}

module.exports = print

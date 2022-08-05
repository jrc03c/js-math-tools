const isArray = require("./is-array.js")
const shape = require("./shape.js")
const { DataFrame, Series } = require("./dataframe")

function print() {
  Object.keys(arguments).forEach(key => {
    const x = arguments[key]

    if (isArray(x)) {
      const xShape = shape(x)

      if (xShape.length === 1) {
        new Series(x).print()
      } else if (xShape.length == 2) {
        new DataFrame(x).print()
      } else {
        console.log(x)
      }
    } else if (x instanceof DataFrame || x instanceof Series) {
      x.print()
    } else {
      console.log(x)
    }
  })
}

module.exports = print

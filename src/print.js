let isArray = require("./is-array.js")
let shape = require("./shape.js")
let DataFrame = require("./dataframe/dataframe.js")
let Series = require("./series/series.js")

function print() {
  Object.keys(arguments).forEach(key => {
    let x = arguments[key]

    if (isArray(x)) {
      let xShape = shape(x)

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

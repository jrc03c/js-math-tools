let isArray = require("../math/is-array.js")
let shape = require("../math/shape.js")
let DataFrame = require("../math/classes/dataframe.js")
let Series = require("../math/classes/series.js")

function print(x){
  if (isArray(x)){
    let xShape = shape(x)

    if (xShape.length === 1){
      new DataFrame([x]).print()
    } else if (xShape.length == 2){
      new DataFrame(x).print()
    } else {
      console.log(x)
    }
  } else if (x instanceof DataFrame){
    x.print()
  } else if (x instanceof Series){
    let temp = {}
    temp[x.name] = x.values
    let df = new DataFrame(temp)
    df.index = x.index
    df.print()
  } else {
    console.log(x)
  }
}

module.exports = print

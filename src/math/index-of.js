const assert = require("../misc/assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const shape = require("./shape.js")
const isEqual = require("./is-equal.js")

function indexOf(x, v, requireIdentity){
  assert(!isUndefined(x), "You must pass an array and a value into the `indexOf` function!")
  assert(isArray(x), "You must pass an array and a value into the `indexOf` function!")

  if (shape(x).length === 1 || (isArray(v) && isEqual(shape(x[0]), shape(v)))){
    let out = -1

    for (let i=0; i<x.length; i++){
      let value = x[i]

      if (isEqual(value, v) && (requireIdentity ? value === v : true)){
        return [i]
      }
    }

    return null
  }

  else {
    for (let i=0; i<x.length; i++){
      let row = x[i]
      let index = indexOf(row, v)
      if (index) return [i].concat(index)
    }
  }

  return null
}

module.exports = indexOf

// tests
if (!module.parent && typeof(window) === "undefined"){
  const normal = require("./normal.js")
  const seed = require("./seed.js")

  seed(12345)

  let x = normal([10, 10, 10, 10])
  let indexTrue = [5, 4, 2, 7]
  let indexPred = indexOf(x, x[5][4][2][7])
  assert(isEqual(indexTrue, indexPred), `Uh-oh! The predicted index should've been [${indexTrue.join(", ")}], but instead it was [${indexPred.join(", ")}]!`)

  x = normal(100)
  indexTrue = 57
  indexPred = indexOf(x, x[57])[0]
  assert(isEqual(indexTrue, indexPred), `Uh-oh! The predicted index should've been ${indexTrue}, but instead it was ${indexPred}!`)

  assert(isUndefined(indexOf(x, "foo")), `Uh-oh! The predicted index should've been null, but instead it was ${indexOf(x, "foo")}!`)

  x = normal([10, 10, 10, 10])
  indexTrue = [5, 4, 2]
  indexPred = indexOf(x, x[5][4][2])
  assert(isEqual(indexTrue, indexPred), `Uh-oh! The predicted index should've been [${indexTrue.join(", ")}], but instead it was [${indexPred.join(", ")}]!`)

  x = ["foo", "bar", {hello: "world"}]
  indexTrue = 2
  indexPred = indexOf(x, {hello: "world"})[0]
  assert(isEqual(indexTrue, indexPred), `Uh-oh! The predicted index should've been ${indexTrue}, but instead it was ${indexPred}!`)

  indexPred = indexOf(x, {hello: "world"}, true)
  assert(isUndefined(indexPred), `Uh-oh! The predicted index should've been undefined, but instead it was ${indexPred}!`)

  console.log("All tests passed!")
}

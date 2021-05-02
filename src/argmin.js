const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const indexOf = require("./index-of.js")
const min = require("./min.js")

function argmin(x){
  assert(!isUndefined(x), "You must pass an array into the `argmin` function!")
  assert(isArray(x), "You must pass an array into the `argmin` function!")
  return indexOf(x, min(x))
}

module.exports = argmin

// tests
if (!module.parent && typeof(window) === "undefined"){
  const isEqual = require("./is-equal.js")
  const normal = require("./normal.js")
  const shuffle = require("./shuffle.js")
  const range = require("./range.js")

  let x = shuffle(range(0, 100))
  let indexTrue = x.indexOf(0)
  let indexPred = argmin(x)[0]

  assert(isEqual(indexTrue, indexPred), `Uh-oh! The predicted index should've been ${indexTrue}, but instead it was ${indexPred}!`)

  x = [[2, 3, 4], [0, 1, 2], [-5, 10, 20]]
  indexTrue = [2, 0]
  indexPred = argmin(x)
  assert(isEqual(indexTrue, indexPred), `Uh-oh! The predicted index should've been ${indexTrue}, but instead it was ${indexPred}!`)

  console.log("All tests passed!")
}

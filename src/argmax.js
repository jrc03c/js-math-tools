const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const indexOf = require("./index-of.js")
const max = require("./max.js")

function argmax(x){
  assert(!isUndefined(x), "You must pass an array into the `argmax` function!")
  assert(isArray(x), "You must pass an array into the `argmax` function!")
  return indexOf(x, max(x))
}

module.exports = argmax

// tests
if (!module.parent && typeof(window) === "undefined"){
  const isEqual = require("./is-equal.js")
  const normal = require("./normal.js")
  const shuffle = require("./shuffle.js")
  const range = require("./range.js")

  let x = shuffle(range(0, 100))
  let indexTrue = x.indexOf(99)
  let indexPred = argmax(x)[0]

  assert(isEqual(indexTrue, indexPred), `Uh-oh! The predicted index should've been ${indexTrue}, but instead it was ${indexPred}!`)

  x = [[2, 3, 4], [0, 1, 2], [-5, 10, 20]]
  indexTrue = [2, 2]
  indexPred = argmax(x)
  assert(isEqual(indexTrue, indexPred), `Uh-oh! The predicted index should've been ${indexTrue}, but instead it was ${indexPred}!`)

  console.log("All tests passed!")
}

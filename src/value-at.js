const assert = require("./assert.js")
const isUndefined = require("./is-undefined.js")
const isArray = require("./is-array.js")
const isNumber = require("./is-number.js")
const shape = require("./shape.js")
const int = require("./int.js")

function valueAt(x, index){
  assert(!isUndefined(x), "You must pass an array and an index into the `valueAt` function!")
  assert(isArray(x), "You must pass an array and an index into the `valueAt` function!")
  assert(isNumber(index) || isArray(index), "The index passed into the `valueAt` function must be a positive integer or a one-dimensional array of positive integers!")

  if (isArray(index)){
    assert(shape(index).length === 1, "The index passed into the `valueAt` function must be a positive integer or a one-dimensional array of positive integers!")

    index.forEach(value => {
      assert(isNumber(value) && int(value) === value, "The index passed into the `valueAt` function must be a positive integer or a one-dimensional array of positive integers!")
    })

    assert(index.length <= shape(x).length, "The index passed into the `valueAt` function has too many dimensions!")
  }

  if (isNumber(index)){
    assert(index < x.length, `The index ${index} is out of bounds!`)
    return x[index]
  } else {
    if (index.length > 1){
      assert(index[0] < x.length, `The index ${index[0]} is out of bounds!`)
      return valueAt(x[index[0]], index.slice(1))
    } else {
      return valueAt(x, index[0])
    }
  }
}

module.exports = valueAt

// tests
if (!module.parent && typeof(window) === "undefined"){
  const isEqual = require("./is-equal.js")
  const indexOf = require("./index-of.js")
  const normal = require("./normal.js")

  let x = normal([10, 10, 10, 10])
  let valueTrue = x[4][3][2][1]
  let valuePred = valueAt(x, [4, 3, 2, 1])
  assert(valueTrue === valuePred, `Uh-oh! The predicted value should've been ${valueTrue}, but instead it was ${valuePred}!`)

  valueTrue = x[4][3]
  valuePred = valueAt(x, [4, 3])
  assert(isEqual(valueTrue, valuePred), `Uh-oh! The predicted value didn't match the true value!`)

  let hasFailed = true

  try {
    valueAt(x, 100)
    hasFailed = false
  } catch(e){}

  assert(hasFailed, "This test should've failed!")

  try {
    valueAt(x, [10, 20, 30])
    hasFailed = false
  } catch(e){}

  assert(hasFailed, "This test should've failed!")

  try {
    valueAt(x, [0, 0, 0, 0, 0])
    hasFailed = false
  } catch(e){}

  assert(hasFailed, "This test should've failed!")

  console.log("All tests passed!")
}

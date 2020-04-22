let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let shape = require("./shape.js")
let slice = require("./slice.js")
let transpose = require("./transpose.js")

function append(a, b, axis=0){
  assert(!isUndefined(a), "You must pass two arrays into the `append` function!")
  assert(!isUndefined(b), "You must pass two arrays into the `append` function!")
  assert(isArray(a), "You must pass two arrays into the `append` function!")
  assert(isArray(b), "You must pass two arrays into the `append` function!")
  assert(isNumber(axis), "The `axis` argument to the `append` function must be 0 or 1!")
  assert(axis >= 0 && axis < 2, "The `axis` argument to the `append` function must be 0 or 1!")
  assert(parseInt(axis) === axis, "The `axis` argument to the `append` function must be 0 or 1!")

  let aShape = shape(a)
  let bShape = shape(b)

  assert(aShape.length === bShape.length, "The two arrays passed into the `append` function must have the same number of dimensions!")
  assert(aShape.length < 3 && bShape.length < 3, "The two arrays passed into the `append` function must be 1- or 2-dimensional!")

  for (let i=0; i<aShape.length; i++){
    if (i !== axis){
      assert(aShape[i] === bShape[i], `The two arrays passed into the \`append\` function must have the same shapes along all axes *except* the axis along which they're being appended! (${aShape[i]} != ${bShape[i]})`)
    }
  }

  assert(axis < aShape.length, "The axis argument you passed into the `append` function is out of bounds for the array!")

  if (aShape.length === 0){
    return []
  } else if (aShape.length === 1){
    return a.concat(b)
  } else if (aShape.length === 2){
    if (axis === 0){
      let out = []
      for (let i=0; i<aShape[0]; i++) out.push(a[i])
      for (let i=0; i<bShape[0]; i++) out.push(b[i])
      return out
    } else if (axis === 1){
      return transpose(append(transpose(a), transpose(b), 0))
    }
  }
}

module.exports = append

// tests
if (!module.parent && typeof(window) === "undefined"){
  let isEqual = require("./is-equal.js")
  let normal = require("./normal.js")
  let range = require("./range.js")

  function printArray(x){
    return `[${x.join(", ")}]`
  }

  let a = [2, 3, 4]
  let b = [5, 6, 7]
  let axis = 0
  let yTrue = [2, 3, 4, 5, 6, 7]
  let yPred = append(a, b, axis)
  assert(isEqual(yTrue, yPred), `append(${printArray(a)}, ${printArray(b)}) should be ${printArray(yTrue)}, but instead was ${printArray(yPred)}!`)

  a = [[2, 3, 4]]
  b = [[5, 6, 7]]
  axis = 0
  yTrue = [[2, 3, 4], [5, 6, 7]]
  yPred = append(a, b, axis)
  assert(isEqual(yTrue, yPred), `append(${printArray(a)}, ${printArray(b)}) should be ${printArray(yTrue)}, but instead was ${printArray(yPred)}!`)

  a = [[2, 3, 4]]
  b = [[5, 6, 7]]
  axis = 1
  yTrue = [[2, 3, 4, 5, 6, 7]]
  yPred = append(a, b, axis)
  assert(isEqual(yTrue, yPred), `append(${printArray(a)}, ${printArray(b)}) should be ${printArray(yTrue)}, but instead was ${printArray(yPred)}!`)

  yTrue = normal([10, 5])
  a = slice(yTrue, [range(0, 3), null])
  b = slice(yTrue, [range(3, 10), null])
  axis = 0
  yPred = append(a, b, axis)
  assert(isEqual(yTrue, yPred), `FAIL when appending 2D matrices on axis 0!`)

  yTrue = normal([5, 10])
  a = slice(yTrue, [null, range(0, 3)])
  b = slice(yTrue, [null, range(3, 10)])
  axis = 1
  yPred = append(a, b, axis)
  assert(isEqual(yTrue, yPred), `FAIL when appending 2D matrices on axis 1!`)

  let hasFailed

  try {
    hasFailed = false
    append()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `append() should have failed!`)

  try {
    hasFailed = false
    append(normal([2, 3]), normal([4, 5]), 0)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `append(normal([2, 3]), normal([4, 5]), 0) should have failed!`)

  try {
    hasFailed = false
    append(normal([3, 3]), normal([3, 2]), 0)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `append(normal([3, 3]), normal([3, 2]), 0) should have failed!`)

  try {
    hasFailed = false
    append(normal([3, 2]), normal([2, 2]), 1)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `append(normal([3, 2]), normal([2, 2]), 1) should have failed!`)

  try {
    hasFailed = false
    append(normal([5, 5], normal([5, 5])), 2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `append(normal([5, 5]), normal([5, 5]), 2) should have failed!`)

  try {
    hasFailed = false
    append(normal([2, 3, 4]), normal([2, 3, 4]), 0)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `append(normal([2, 3, 4]), normal([2, 3, 4]), 0) should have failed!`)

  console.log("All tests passed! (But I should probably make `append` compatible with (n > 2)-dimensional arrays!)")
}

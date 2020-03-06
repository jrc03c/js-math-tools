let assert = require("../misc/assert.js")
let vectorize = require("./vectorize.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")

let abs = vectorize(function(x){
  assert(!isUndefined(x), "You must pass exactly one number into the `abs` function!")
  assert(isNumber(x), "The `abs` function only works on numbers!")
  return Math.abs(x)
})

module.exports = abs

// tests
if (!module.parent){
  let result = abs(3)
  assert(result === 3, `abs(3) should be 3, but instead is ${result}!`)

  result = abs(-3)
  assert(result === 3, `abs(-3) should be 3, but instead is ${result}!`)

  result = abs(17.25)
  assert(result === 17.25, `abs(17.25) should be 17.25, but instead is ${result}!`)

  result = abs(-101.5)
  assert(result === 101.5, `abs(-101.5) should be 101.5, but instead is ${result}!`)

  x = [-2, 3, -4]
  yTrue = [2, 3, 4]
  yPred = abs(x)

  for (let i=0; i<yTrue.length; i++){
    assert(yTrue[i] === yPred[i], `abs(${x[i]}) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)
  }

  x = [
    [1, -2, -3],
    [4, -5, 6],
    [-7, 8, -9],
  ]

  yTrue = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]

  yPred = abs(x)

  for (let r=0; r<yTrue.length; r++){
    for (let c=0; c<yTrue[r].length; c++){
      assert(yTrue[r][c] === yPred[r][c], `abs(${x[r][c]}) should be ${yTrue[r][c]}, but instead is ${yPred[r][c]}!`)
    }
  }

  let hasFailed

  try {
    hasFailed = false
    abs("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs("foo") should have failed!`)

  try {
    hasFailed = false
    abs(["foo", "bar", "baz"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(["foo", "bar", "baz"]) should have failed!`)

  try {
    hasFailed = false
    abs({x: 5})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs({x: 5}) should have failed!`)

  try {
    hasFailed = false
    abs(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(true) should have failed!`)

  let foo

  try {
    hasFailed = false
    abs(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(foo) should have failed!`)

  console.log("All tests passed!")
}

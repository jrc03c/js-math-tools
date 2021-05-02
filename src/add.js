let assert = require("./assert.js")
let vectorize = require("./vectorize.js")
let isNumber = require("./is-number.js")
let isString = require("./is-string.js")
let isUndefined = require("./is-undefined.js")

let add = vectorize(function(){
  let out = 0
  let argKeys = Object.keys(arguments)
  let argValues = argKeys.map(key => arguments[key])
  let argTypes = argValues.map(value => typeof(value))

  argValues.forEach(value => assert(isNumber(value) || isString(value), "The `add` function only works on strings or numbers!"))

  argValues.forEach(value => assert(!isUndefined(value), "You must pass numbers or equally-sized arrays of numbers into the `add` function!"))

  if (argTypes.indexOf("string") > -1) out = ""

  argValues.forEach(x => out += x)

  return out
})

module.exports = add

// tests
if (!module.parent && typeof(window) === "undefined"){
  let a = 3
  let b = 4
  cTrue = a + b
  cPred = add(a, b)
  assert(cTrue === cPred, `add(${a}, ${b}) should be ${cTrue}, but instead is ${cPred}!`)

  a = -4
  b = 22.5
  cTrue = a + b
  cPred = add(a, b)
  assert(cTrue === cPred, `add(${a}, ${b}) should be ${cTrue}, but instead is ${cPred}!`)

  a = [2, 3, 4]
  b = -10
  cTrue = [-8, -7, -6]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = -10
  b = [2, 3, 4]
  cTrue = [-8, -7, -6]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = [2, 3, 4]
  b = [5, 6, 7]
  cTrue = [7, 9, 11]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = [[2, 3, 4], [5, 6, 7]]
  b = 10
  cTrue = [[12, 13, 14], [15, 16, 17]]
  cPred = add(a, b)

  for (let row=0; row<cTrue.length; row++){
    for (let col=0; col<cTrue[row].length; col++){
      assert(cTrue[row][col] === cPred[row][col], `add(${a[row][col]}, ${b}) should be ${cTrue[row][col]}, but instead is ${cPred[row][col]}!`)
    }
  }

  a = [[2, 3, 4], [5, 6, 7]]
  b = [10, 20, 30]
  let hasFailed

  try {
    hasFailed = false
    add(a, b)
  } catch(e){
    hasFailed = true
  }

  if (!hasFailed) assert(false, `add(${a}, ${b}) should have failed!`)

  a = "hello, "
  b = ["foo", "bar", "baz"]
  cTrue = ["hello, foo", "hello, bar", "hello, baz"]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = true
  b = 3

  try {
    hasFailed = false
    add(a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add(${a}, ${b}) should have failed!`)

  a = [2, 3, 4]
  b = [5, 6, "seven"]
  cTrue = [7, 9, "4seven"]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b[i]}) should be ${cTrue[i]}, but instead was ${cPred[i]}!`)

  let foo

  try {
    hasFailed = false
    add(3, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add(3, foo) should have failed!`)

  console.log("All tests passed!")
}

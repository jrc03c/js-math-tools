let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isFunction = require("./is-function.js")
let isArray = require("./is-array.js")
let max = require("./max.js")

function vectorize(fn){
  assert(!isUndefined(fn), "You must pass a function into the `vectorize` function!")
  assert(isFunction(fn), "You must pass a function into the `vectorize` function!")

  return function temp(){
    let atLeastOneArgumentIsAnArray = (Object.keys(arguments).map(key => isArray(arguments[key])).indexOf(true) > -1)

    if (atLeastOneArgumentIsAnArray){
      let out = []
      let lengths = Object.keys(arguments).filter(key => isArray(arguments[key])).map(key => arguments[key].length)
      let maxLength = max(lengths)

      lengths.forEach(function(length){
        assert(length === maxLength, `If using arrays for all arguments to this function, then the arrays must all have equal length!`)
      })

      for (let i=0; i<maxLength; i++){
        let args = Object.keys(arguments).map(key => {
          if (isArray(arguments[key])) return arguments[key][i]
          return arguments[key]
        })
        out.push(temp(...args))
      }

      return out
    } else {
      return fn(...arguments)
    }
  }
}

module.exports = vectorize

// tests
if (!module.parent){
  let isEqual = require("./is-equal.js")

  let x = [2, 3, 4]
  let double = vectorize(x => x * 2)
  let yTrue = [4, 6, 8]
  let yPred = double(x)
  assert(isEqual(yTrue, yPred), "double([2, 3, 4]) should be [4, 6, 8]!")

  x = [0, 1, 2, 3]
  let tens = vectorize(x => 10)
  yTrue = [10, 10, 10, 10]
  yPred = tens(x)
  assert(isEqual(yTrue, yPred), "tens([0, 1, 2, 3]) should be [10, 10, 10, 10]!")

  x = [[[[1, 2, 3, 4]]]]
  let square = vectorize(x => x * x)
  yTrue = [[[[1, 4, 9, 16]]]]
  yPred = square(x)
  assert(isEqual(yTrue, yPred), "square([[[[1, 2, 3, 4]]]]) should be [[[[1, 4, 9, 16]]]]!")

  x = ["a", "b", "c"]
  let foo = vectorize(x => x + "foo")
  yTrue = ["afoo", "bfoo", "cfoo"]
  yPred = foo(x)
  assert(isEqual(yTrue, yPred), `foo(["a", "b", "c"]) should be ["afoo", "bfoo", "cfoo"]!`)

  let hasFailed

  try {
    hasFailed = false
    vectorize()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize() should have failed!`)

  try {
    hasFailed = false
    let add = vectorize((a, b) => a + b)
    add([2, 3, 4], [5, 6])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add([2, 3, 4], [5, 6]) should have failed!`)

  try {
    hasFailed = false
    vectorize(123)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize(123) should have failed!`)

  try {
    hasFailed = false
    vectorize("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize("foo") should have failed!`)

  try {
    hasFailed = false
    vectorize(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize(true) should have failed!`)

  try {
    hasFailed = false
    vectorize({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize({}) should have failed!`)

  try {
    let foo
    hasFailed = false
    vectorize(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize(foo) should have failed!`)

  try {
    hasFailed = false
    vectorize([])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `vectorize([]) should have failed!`)

  console.log("All tests passed!")
}

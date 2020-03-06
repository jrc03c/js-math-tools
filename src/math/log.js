let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let log = vectorize(function(x, base){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `log` function!")
  assert(isNumber(x), "You must pass a single number or a single array of numbers into the `log` function!")

  base = isUndefined(base) ? Math.E : base
  assert(isNumber(base), "The base parameter of the `log` function must be a number or an array of numbers!")

  return Math.log(x) / Math.log(base)
})

module.exports = log

// tests
if (!module.parent){
  let abs = require("./abs.js")
  let chop = require("./chop.js")

  let x = Math.E
  let base = Math.E
  let yTrue = 1
  let yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 10
  base = 10
  yTrue = 1
  yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 100
  base = 10
  yTrue = 2
  yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [100, 1000, 10000]
  base = 10
  yTrue = [2, 3, 4]
  yPred = log(x, base)
  for (let i=0; i<yTrue.length; i++) assert(chop(abs(yTrue[i] - yPred[i])) === 0, `log(${x[i]}, ${base}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = 64
  base = [2, 4, 8]
  yTrue = [6, 3, 2]
  yPred = log(x, base)
  for (let i=0; i<yTrue.length; i++) assert(chop(abs(yTrue[i] - yPred[i])) === 0, `log(${x[i]}, ${base}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  assert(log([]).length === 0, `log([]) should have produced an empty array!`)

  let hasFailed

  try {
    hasFailed = false
    log()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log() should have failed!`)

  try {
    hasFailed = false
    log("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log("foo") should have failed!`)

  try {
    hasFailed = false
    log({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log({}) should have failed!`)

  try {
    hasFailed = false
    log(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(true) should have failed!`)

  try {
    hasFailed = false
    log(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    log(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(foo) should have failed!`)

  console.log("All tests passed!")
}

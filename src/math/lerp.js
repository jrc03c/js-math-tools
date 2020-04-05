let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let lerp = vectorize(function(a, b, f){
  assert(!isUndefined(a) && !isUndefined(b) && !isUndefined(f), "You must pass exactly three numbers (or three equally-sized arrays of numbers) into the `lerp` function!")

  assert(isNumber(a) && isNumber(b) && isNumber(f), "The `lerp` function only works on numbers!")

  return f * (b - a) + a
})

module.exports = lerp

// tests
if (!module.parent && !window){
  let a = 0
  let b = 1
  let f = 1
  let c = lerp(a, b, f)
  assert(c === 1, `lerp(0, 1, 1) should be 1, but instead was ${c}!`)

  a = -1
  b = 1
  f = 0.5
  c = lerp(a, b, f)
  assert(c === 0, `lerp(-1, 1, 0.5) should be 0, but instead was ${c}!`)

  a = -100
  b = 100
  f = 0.75
  c = lerp(a, b, f)
  assert(c === 50, `lerp(-100, 100, 0.75) should be 50, but instead was ${c}!`)

  a = [1, 2, 3]
  b = [2, 3, 4]
  f = [0.5, 0.75, 0.9]
  let cTrue = [1.5, 2.75, 3.9]
  let cPred = lerp(a, b, f)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `lerp(${a[i]}, ${b[i]}, ${f[i]}) should be ${cTrue[i]}, but instead was ${cPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    lerp(3, 4, "foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(3, 4, "foo") should have failed!`)

  try {
    hasFailed = false
    lerp([1], [2, 3], 0.75)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp([1], [2, 3], 0.75) should have failed!`)

  try {
    hasFailed = false
    lerp({}, {}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp({}, {}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    lerp(foo, foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(foo, foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    lerp(fn, fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(fn, fn, fn) should have failed!`)

  try {
    hasFailed = false
    lerp(1, 2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(1, 2) should have failed!`)

  console.log("All tests passed!")
}

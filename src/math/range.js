let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")

function range(a, b, step=1){
  assert(!isUndefined(a) && !isUndefined(b) && !isUndefined(step), "You must pass two numbers and optionally a step value to the `range` function!")
  assert(isNumber(a) && isNumber(b) && isNumber(step), "You must pass two numbers and optionally a step value to the `range` function!")
  assert(step > 0, "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)")

  let shouldReverse = false

  if (a > b){
    shouldReverse = true
    let buffer = a
    a = b + step
    b = buffer + step
  }

  let out = []
  for (let i=a; i<b; i+=step) out.push(i)
  if (shouldReverse) out.reverse()
  return out
}

module.exports = range

// tests
if (!module.parent){
  let yTrue = [5, 6, 7, 8, 9]
  let yPred = range(5, 10)
  for (let i=0; i<yTrue; i++) assert(yTrue[i] === yPred[i], `range(5, 10) should be [5, 6, 7, 8, 9]!`)

  yTrue = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5]
  yPred = range(5, 10, 0.5)
  for (let i=0; i<yTrue; i++) assert(yTrue[i] === yPred[i], `range(5, 10, 0.5) should be [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5]!`)

  yTrue = [3, 2, 1, 0, -1, -2]
  yPred = range(3, -3)
  for (let i=0; i<yTrue; i++) assert(yTrue[i] === yPred[i], `range(3, -3) should be [3, 2, 1, 0, -1, -2]!`)

  yTrue = [-1, -1.25, -1.5, -1.75]
  yPred = range(-1, -2, 0.25)
  for (let i=0; i<yTrue; i++) assert(yTrue[i] === yPred[i], `range(-1, -2, 0.25) should be [-1, -1.25, -1.5, -1.75]!`)

  let hasFailed

  try {
    hasFailed = false
    range()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range() should have failed!`)

  try {
    hasFailed = false
    range(1, 2, -3)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range(1, 2, -3) should have failed!`)

  try {
    hasFailed = false
    range("foo", "bar", "baz")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range("foo", "bar", "baz") should have failed!`)

  try {
    hasFailed = false
    range([], [], [])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range([], [], []) should have failed!`)

  try {
    hasFailed = false
    range(true, true, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range(true, true, true) should have failed!`)

  try {
    hasFailed = false
    range({}, {}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range({}, {}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    range(foo, foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range(foo, foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    range(fn, fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `range(fn, fn, fn) should have failed!`)

  console.log("All tests passed!")
}

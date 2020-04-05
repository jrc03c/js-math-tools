let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let flatten = require("./flatten.js")

function set(arr){
  assert(!isUndefined(arr), "You must pass an array into the `set` function!")
  assert(isArray(arr), "You must pass an array into the `set` function!")

  let out = []

  flatten(arr).forEach(function(item){
    if (out.indexOf(item) < 0) out.push(item)
  })

  return out
}

module.exports = set

// tests
if (!module.parent && !window){
  let sort = require("./sort.js")
  let round = require("./round.js")
  let random = require("./random.js")
  let range = require("./range.js")

  function alphasort(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  let x = [2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4]
  let yTrue = [2, 3, 4]
  let yPred = sort(set(x), alphasort)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `set([2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 2, 2, 3, 3, 3, 3, 4]) should be [2, 3, 4]!`)

  x = round(random([10, 10, 10, 10]))
  yTrue = [0, 1]
  yPred = sort(set(x), alphasort)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `set(round(random([10, 10, 10, 10]))) should be [0, 1]!`)

  x = range(10, 20, 0.25)
  yTrue = x.slice()
  yPred = set(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `set(range(10, 20, 0.25)) should be the same as range(10, 20, 0.25)!`)

  x = ["foo", "bar", "baz", "foo", "foo", true, true, false, true, 234, 234, 0]
  yTrue = ["foo", "bar", "baz", true, false, 234, 0]
  yPred = set(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `set(["foo", "bar", "baz", "foo", "foo", true, true, false, true, 234, 234, 0]) should be ["foo", "bar", "baz", true, false, 234, 0]!`)

  let hasFailed

  try {
    hasFailed = false
    set()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set() should have failed!`)

  try {
    hasFailed = false
    set("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set("foo") should have failed!`)

  try {
    hasFailed = false
    set(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set(234) should have failed!`)

  try {
    hasFailed = false
    set(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set(true) should have failed!`)

  try {
    hasFailed = false
    set({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set({}) should have failed!`)

  try {
    hasFailed = false
    set(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    set(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `set(foo) should have failed!`)

  console.log("All tests passed!")
}

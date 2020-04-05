let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")

function sort(arr, fn){
  assert(!isUndefined(arr) && !isUndefined(fn), "You must pass an array and a function into the `sort` function!")
  assert(isArray(arr), "You must pass an array and a function into the `sort` function!")
  assert(typeof(fn) === "function", "You must pass an array and a function into the `sort` function!")

  let out = arr.slice()
  out.sort(fn)
  return out
}

module.exports = sort

// tests
if (!module.parent && !window){
  let shuffle = require("./shuffle.js")
  let range = require("./range.js")
  let distance = require("./distance.js")
  let normal = require("./normal.js")

  function alphasort(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  let x = shuffle(range(1, 7))
  let yTrue = range(1, 7)
  let yPred = sort(x, alphasort)
  assert(distance(yTrue, yPred) === 0, `sort(shuffle(range(1, 7)), alphasort) should be range(1, 7)!`)

  x = [{x: 5}, {x: 3}, {x: 10}]
  yTrue = [{x: 10}, {x: 5}, {x: 3}]
  yPred = sort(x, function(a, b){
    if (a.x < b.x) return 1
    if (a.x > b.x) return -1
    return 0
  })

  for (let i=0; i<yPred.length-1; i++){
    assert(yPred[i].x > yPred[i+1].x, "The objects should've been reverse-sorted by x-value!")
  }

  x = normal(10000)
  yPred = sort(x, alphasort)

  for (let i=0; i<yPred.length-1; i++){
    assert(yPred[i] < yPred[i+1], `${yPred[i]} should be less than ${yPred[i+1]}!`)
  }

  x = ["b", "c", "a", "d", "f", "e"]
  yTrue = ["a", "b", "c", "d", "e", "f"]
  yPred = sort(x, alphasort)

  for (let i=0; i<yTrue.length; i++){
    assert(yTrue[i] === yPred[i], `sort(["b", "c", "a", "d", "f", "e"], alphasort) should be ["a", "b", "c", "d", "e", "f"]!`)
  }

  let hasFailed

  try {
    hasFailed = false
    sort()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort() should have failed!`)

  try {
    hasFailed = false
    sort([], [])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort([], []) should have failed!`)

  try {
    hasFailed = false
    sort("foo", "foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort("foo", "foo") should have failed!`)

  try {
    hasFailed = false
    sort(true, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort(true, true) should have failed!`)

  try {
    hasFailed = false
    sort({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort({}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    sort(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort(foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    sort(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `sort(fn, fn) should have failed!`)

  console.log("All tests passed!")
}

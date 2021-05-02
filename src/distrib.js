let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let min = require("./min.js")
let max = require("./max.js")
let apply = require("./apply.js")

function distrib(x, bins){
  assert(!isUndefined(x), "You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!")
  assert(isArray(x), "You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!")

  let temp = flatten(x)
  temp.forEach(val => assert(isNumber(val)), "You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!")

  if (isUndefined(bins)){
    bins = parseInt(temp.length / 10)
  } else {
    assert(isNumber(bins), "You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!")
    assert(bins === parseInt(bins), "You must pass an array of numbers (and optionally an integer number of bins) into the `distrib` function!")
  }

  let out = []
  let start = min(temp)
  let stop = max(temp)
  let step = (stop - start) / bins

  for (let i=start; i<stop; i+=step){
    let drop = temp.filter(val => (val >= i && val < i + step) || (i + step >= stop && val >= stop))
    let count = drop.length
    drop.forEach(val => temp.splice(temp.indexOf(val), 1))
    out.push(count)
  }

  return out
}

module.exports = distrib

// tests
if (!module.parent && typeof(window) === "undefined"){
  let isEqual = require("./is-equal.js")
  let normal = require("./normal.js")

  let x = [1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  let bins = 5
  let yTrue = [5, 4, 3, 2, 1]
  let yPred = distrib(x, bins)
  assert(isEqual(yTrue, yPred), `distrib([1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5], 5) should be [5, 4, 3, 2, 1], but instead was [${yPred.join(", ")}]!`)

  x = [3, 4, 5, 6, 7, 8, 9, 10]
  bins = 8
  yTrue = [1, 1, 1, 1, 1, 1, 1, 1]
  yPred = distrib(x, bins)
  assert(isEqual(yTrue, yPred), `distrib([3, 4, 5, 6, 7, 8, 9, 10], 8) should be [1, 1, 1, 1, 1, 1, 1, 1], but instead was [${yPred.join(", ")}]!`)

  x = [-2.5, -2.5, -1.5, -1.5, -1.5, -1.5, -0.5, 0.5, 0.5, 0.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 2.5]
  bins = 3
  yTrue = [6, 4, 7]
  yPred = distrib(x, bins)
  assert(isEqual(yTrue, yPred), `distrib([-2.5, -2.5, -1.5, -1.5, -1.5, -1.5, -0.5, 0.5, 0.5, 0.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 2.5], 3) should be [6, 4, 7], but instead was [${yPred.join(", ")}]!`)

  let hasFailed

  try {
    hasFailed = false
    distrib()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib() should have failed!`)

  try {
    hasFailed = false
    distrib(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib(true) should have failed!`)

  try {
    hasFailed = false
    distrib("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib("foo") should have failed!`)

  try {
    hasFailed = false
    distrib(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib(234) should have failed!`)

  try {
    let foo
    hasFailed = false
    distrib(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib(foo) should have failed!`)

  try {
    hasFailed = false
    distrib(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib(() => {}) should have failed!`)

  try {
    hasFailed = false
    distrib({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib({}) should have failed!`)

  try {
    hasFailed = false
    distrib([], "foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib([], "foo") should have failed!`)

  try {
    hasFailed = false
    distrib([], true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib(true) should have failed!`)

  try {
    hasFailed = false
    distrib([], [])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib([]) should have failed!`)

  try {
    hasFailed = false
    distrib([], {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib([], {}) should have failed!`)

  try {
    hasFailed = false
    distrib([], () => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `distrib([], () => {}) should have failed!`)

  console.log("All tests passed!")
}

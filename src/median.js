let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let sort = require("./sort.js")

function median(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `median` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `median` function!")

  let temp = flatten(arr)

  temp.forEach(function(item){
    assert(isNumber(item), "The `median` function only works on numbers!")
  })

  temp = sort(temp, function(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })

  let out

  if (temp.length % 2 === 0){
    out = (temp[temp.length / 2 - 1] + temp[temp.length / 2]) / 2
  } else {
    out = temp[Math.floor(temp.length / 2)]
  }

  return out
}

module.exports = median

// tests
if (!module.parent && typeof(window) === "undefined"){
  let shuffle = require("./shuffle.js")
  let normal = require("./normal.js")
  let random = require("./random.js")
  let round = require("./round.js")
  let scale = require("./scale.js")

  let x = [2, 4, 3]
  let yTrue = 3
  let yPred = median(x)
  assert(yTrue === yPred, `median([2, 4, 3]) should be 3, but instead was ${yPred}!`)

  let x1 = round(scale(random([5, 5, 5, 5]), 100))
  let x2 = shuffle(x1)
  let x3 = shuffle(x1)
  let x4 = shuffle(x1)
  let y1 = median(x1)
  let y2 = median(x2)
  let y3 = median(x3)
  let y4 = median(x4)
  assert(y1 === y2 && y2 === y3 && y3 === y4, "The `median` function should return the same median for shuffled versions of the same array!")

  assert(isNaN(median([])), `median([]) should be NaN!`)

  let hasFailed

  try {
    hasFailed = false
    median()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median() should have failed!`)

  try {
    hasFailed = false
    median("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median("foo") should have failed!`)

  try {
    hasFailed = false
    median([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    median([true])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([true]) should have failed!`)

  try {
    hasFailed = false
    median([{}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([{}]) should have failed!`)

  try {
    let foo
    hasFailed = false
    median([foo, foo, foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([foo, foo, foo]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    median([fn, fn, fn,])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([fn, fn, fn]) should have failed!`)

  console.log("All tests passed!")
}

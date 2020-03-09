let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function ones(shape){
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

// tests
if (!module.parent){
  let assert = require("../misc/assert.js")
  let sum = require("./sum.js")
  let mean = require("./mean.js")
  let std = require("./std.js")
  let flatten = require("./flatten.js")

  let x = ones([2, 3, 4, 5])
  assert(sum(x) === 2 * 3 * 4 * 5, `sum(ones([2, 3, 4, 5])) should be 2 * 3 * 4 * 5!`)
  assert(mean(x) === 1, `mean(ones([2, 3, 4, 5])) should be 1!`)
  assert(std(x) === 0, `std(ones([2, 3, 4, 5])) should be 0!`)
  assert(sum(x) === flatten(x).length, `sum(ones([2, 3, 4, 5])) should be the same as flatten(ones([2, 3, 4, 5])).length!`)

  let hasFailed

  try {
    hasFailed = false
    ones()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones() should have failed!`)

  try {
    hasFailed = false
    ones("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones("foo") should have failed!`)

  try {
    hasFailed = false
    ones(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones(true) should have failed!`)

  try {
    hasFailed = false
    ones({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones({}) should have failed!`)

  try {
    let foo
    hasFailed = false
    ones(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones(foo) should have failed!`)

  try {
    hasFailed = false
    ones([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    ones(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ones(() => {}) should have failed!`)

  console.log("All tests passed!")
}

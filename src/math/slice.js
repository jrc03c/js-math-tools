let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let isArray = require("./is-array.js")
let range = require("./range.js")

function slice(arr, indices){
  assert(!isUndefined(arr), "You must pass an array into the `slice` function!")
  if (isUndefined(indices)) return arr.slice()

  let idx = indices[0]
  if (isUndefined(idx)) idx = range(0, arr.length)
  if (isNumber(idx)) idx = [idx]

  let out = []

  idx.forEach(function(i){
    assert(i < arr.length, "Index out of bounds in the `slice` function!")

    let item = arr[i]

    if (isArray(item)){
      out.push(slice(arr[i], indices.slice(1, indices.length)))
    } else {
      out.push(arr[i])
    }
  })

  return out
}

module.exports = slice

// tests
if (!module.parent){
  
  console.log("All tests passed!")
}

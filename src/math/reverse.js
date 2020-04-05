let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")

function reverse(arr){
  assert(!isUndefined(arr), "You must pass an array into the `reverse` function!")
  assert(isArray(arr), "You must pass an array into the `reverse` function!")

  let out = []
  for (let i=arr.length-1; i>=0; i--) out.push(arr[i])
  return out
}

module.exports = reverse

// tests
if (!module.parent && !window){
  console.log("All tests passed!")
}

function isArray(obj){
  return obj instanceof Array
}

module.exports = isArray

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")

  assert(isArray([]), `isArray([]) should return true!`)
  assert(isArray([2, 3, 4]), `isArray([2, 3, 4]) should return true!`)
  assert(isArray(new Array()), `isArray(new Array()) should return true!`)
  assert(!isArray({}), `isArray({}) should return false!`)
  assert(!isArray({push: () => {}}), `isArray({push: () => {}}) should return false!`)
  assert(!isArray("foo"), `isArray("foo") should return false!`)
  assert(!isArray(true), `isArray(true) should return false!`)
  assert(!isArray(false), `isArray(false) should return false!`)
  assert(!isArray(() => {}), `isArray(() => {}) should return false!`)
  assert(!isArray(3), `isArray(3) should return false!`)

  console.log("All tests passed!")
}

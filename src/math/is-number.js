function isNumber(x){
  return typeof(x) === "number"
}

module.exports = isNumber

// tests
if (!module.parent){
  let assert = require("../misc/assert.js")

  assert(isNumber(3), `3 is a number!`)
  assert(isNumber(-3.5), `-3.5 is a number!`)
  assert(isNumber(2573.2903482093482035023948, `2573.2903482093482035023948 is a number!`))
  assert(!isNumber("35"), `"35" is not a number!`)
  assert(!isNumber("foo"), `"foo" is not a number!`)
  assert(!isNumber([2, 3, 4]), `[2, 3, 4] is not a number!`)
  assert(!isNumber({x: 5}), "{x: 5} is not a number!")
  assert(!isNumber(true), `true is not a number!`)
  assert(!isNumber(false), `false is not a number!`)

  console.log("All tests passed!")
}

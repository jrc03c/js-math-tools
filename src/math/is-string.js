function isString(s){
  return typeof(s) === "string"
}

module.exports = isString

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")

  assert(isString("hi"), `"hi" is a string!`)
  assert(isString(""), `"" is a string!`)
  assert(isString(``), `\`\` is a string!`)
  assert(isString('foo', `'foo' is a string!`))
  assert(!isString(3), `3 is not a string!`)
  assert(!isString(true), `true is not a string!`)
  assert(!isString(false), `false is not a string!`)
  assert(!isString({x: 5}), `{x: 5} is not a string!`)
  assert(!isString(["a", "b", "c"]), `["a", "b", "c"] is not a string!`)

  console.log("All tests passed!")
}

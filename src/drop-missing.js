let assert = require("./assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")

function dropMissing(x){
  assert(isArray(x), "The value passed into the `dropMissing` function must be an array!")
  return x.filter(v => !isUndefined(v))
}

module.exports = dropMissing

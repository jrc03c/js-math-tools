let assert = require("./assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")

function dropNaN(x){
  assert(isArray(x), "The value passed into the `dropNaN` function must be an array!")
  return x.filter(v => !isUndefined(v) && isNumber(v))
}

module.exports = dropNaN

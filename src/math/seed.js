let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let s = parseInt(Math.random() * 999999)

function seed(val){
  if (!isUndefined(val)){
    assert(isNumber(val), "If passing a value into the `seed` function, then that value must be a positive integer!")
    assert(parseInt(val) === val, "If passing a value into the `seed` function, then that value must be a positive integer!")
    assert(val >= 0, "If passing a value into the `seed` function, then that value must be a positive integer!")
  }

  if (!isUndefined(val)) s = val
  else return s
}

module.exports = seed

let isUndefined = require("./is-undefined.js")
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function normal(shape){
  function n(){
    let u1 = Math.random()
    let u2 = Math.random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  if (isUndefined(shape)) return n()
  return apply(ndarray(shape), n)
}

module.exports = normal

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")
  let std = require("./std.js")
  let mean = require("./mean.js")
  let abs = require("./abs.js")

  let x = normal([10000])
  let m = mean(x)
  let s = std(x)

  assert(abs(m) < 0.05, `normal([10000]) should have a mean of approximately 0!`)
  assert(abs(s - 1) < 0.05, `normal([10000]) should have a standard deviation of approximately 1!`)

  x = normal([10, 10, 10, 10])
  m = mean(x)
  s = std(x)

  assert(abs(m) < 0.05, `normal([10, 10, 10, 10]) should have a mean of approximately 0!`)
  assert(abs(s - 1) < 0.05, `normal([10, 10, 10, 10]) should have a standard deviation of approximately 1!`)

  let hasFailed

  try {
    hasFailed = false
    normal("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normal("foo") should have failed!`)

  console.log("All tests passed!")
}

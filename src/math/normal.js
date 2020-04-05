let isUndefined = require("./is-undefined.js")
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")
let random = require("./random.js")

function normal(shape){
  function n(){
    let u1 = random()
    let u2 = random()
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
  let seed = require("./seed.js")
  let distance = require("./distance.js")

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

  // seed(230498230498)
  // let a = normal(10000)
  // seed(230498230498)
  // let b = normal(10000)
  // assert(distance(a, b) === 0, "Two normally-distributed arrays seeded with the same value should be identical!")

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

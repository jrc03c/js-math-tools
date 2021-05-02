let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")

function copy(x){
  if (typeof(x) === "object"){
    if (isUndefined(x)){
      return x
    } else if (isArray(x)){
      return x.map(copy)
    } else {
      let out = {}

      Object.keys(x).forEach(function(key){
        out[key] = copy(x[key])
      })

      return out
    }
  } else {
    return x
  }
}

module.exports = copy

// tests
if (!module.parent && typeof(window) === "undefined"){
  let normal = require("./normal.js")
  let isEqual = require("./is-equal.js")
  let isTheSameObject = (a, b) => a === b
  let isACopy = (a, b) => isEqual(a, b) && (typeof(a) === "object" && !isUndefined(a) && !isUndefined(b) ? !isTheSameObject(a, b) : true)

  assert(isACopy(234, copy(234)), `copy(234) failed!`)
  assert(isACopy(true, copy(true)), `copy(true) failed!`)
  assert(isACopy("foo", copy("foo")), `copy("foo") failed!`)
  assert(isACopy([2, 3, 4], copy([2, 3, 4])), `copy([2, 3, 4]) failed!`)
  assert(isACopy(undefined, copy(undefined)), `copy(undefined) failed!`)

  let x = normal([10, 10, 10])
  assert(isACopy(x, copy(x)), `copy(normal([10, 10, 10])) failed!`)

  x = {foo: normal([5, 5, 5, 5]), name: "Josh", position: {x: 234.5, y: 567.8, z: -890.1}}
  assert(isACopy(x, copy(x)), `copy(obj) failed!`)

  x = () => {}
  assert(isACopy(x, copy(x)), `copy(fn) failed!`)

  x = null
  assert(isACopy(x, copy(x)), `copy(null) failed!`)

  console.log("All tests passed!")
}

let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let zeros = require("./zeros.js")

function identity(size){
  assert(!isUndefined(size), "You must pass an integer greater than 0 (representing the size) into the `identity` function!")
  assert(isNumber(size), "You must pass an integer greater than 0 (representing the size) into the `identity` function!")
  assert(parseInt(size) === size, "You must pass an integer greater than 0 (representing the size) into the `identity` function!")
  assert(size > 0, "You must pass an integer greater than 0 (representing the size) into the `identity` function!")

  let out = zeros([size, size])
  for (let i=0; i<size; i++) out[i][i] = 1
  return out
}

module.exports = identity

// tests
if (!module.parent && typeof(window) === "undefined"){
  function isIdentity(x){
    for (let i=0; i<x.length; i++){
      let row = x[i]

      for (let j=0; j<row.length; j++){
        if (i === j){
          if (x[i][j] !== 1) return false
        } else {
          if (x[i][j] !== 0) return false
        }
      }
    }

    return true
  }

  let x = identity(100)
  assert(isIdentity(x), `identity(100) is not an identity matrix!`)

  let hasFailed

  try {
    hasFailed = false
    identity()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity() should have failed!`)

  try {
    hasFailed = false
    identity("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity("foo") should have failed!`)

  try {
    hasFailed = false
    identity(23.4)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity(23.4) should have failed!`)

  try {
    hasFailed = false
    identity(-10)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity(-10) should have failed!`)

  try {
    hasFailed = false
    identity(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity(true) should have failed!`)

  try {
    hasFailed = false
    identity({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity({}) should have failed!`)

  try {
    hasFailed = false
    identity(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    identity(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity(foo) should have failed!`)

  try {
    hasFailed = false
    identity([])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `identity([]) should have failed!`)

  console.log("All tests passed!")
}

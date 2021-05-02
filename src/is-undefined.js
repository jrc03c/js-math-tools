function isUndefined(x){
  return x === null || typeof(x) === "undefined"
}

module.exports = isUndefined

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("./assert.js")

  assert(!isUndefined("foo"), `isUndefined("foo") should be false, but instead was true!`)
  assert(!isUndefined({}), `isUndefined({}) should be false, but instead was true!`)
  assert(!isUndefined(3), `isUndefined(3) should be false, but instead was true!`)
  assert(!isUndefined([]), `isUndefined([]) should be false, but instead was true!`)
  assert(!isUndefined(true), `isUndefined(true) should be false, but instead was true!`)
  assert(!isUndefined(false), `isUndefined(false) should be false, but instead was true!`)
  assert(!isUndefined(() => {}), `isUndefined(() => {}) should be false, but instead was true!`)

  let x
  assert(isUndefined(x), `isUndefined(x) should be true, but instead was false!`)

  let hasFailed

  try {
    hasFailed = false
    isUndefined(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `isUndefined(foo) should have failed!`)

  console.log("All tests passed!")
}

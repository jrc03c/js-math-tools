let isArray = require("./is-array.js")

function isEqual(a, b){
  let aType = typeof(a)
  let bType = typeof(b)
  if (aType !== bType) return false

  if (aType === "undefined") return true
  if (aType === "boolean") return a === b
  if (aType === "number") return a === b
  if (aType === "string") return a === b

  if (aType === "object"){
    if (a === null || b === null){
      return a === null && b === null
    } else {
      let aKeys = Object.keys(a)
      let bKeys = Object.keys(b)
      if (aKeys.length !== bKeys.length) return false

      for (let i=0; i<aKeys.length; i++){
        let key = aKeys[i]
        if (!b.hasOwnProperty(key)) return false
        if (!isEqual(a[key], b[key])) return false
      }

      return true
    }
  }
}

module.exports = isEqual

// tests
if (!module.parent && typeof(window) === "undefined"){
  let assert = require("../misc/assert.js")

  assert(isEqual(2, 2), `isEqual(2, 2) should be true!`)
  assert(isEqual(-3.5, -3.5), `isEqual(-3.5, -3.5) should be true!`)
  assert(isEqual("foo", "foo"), `isEqual("foo", "foo") should be true!`)
  assert(isEqual(true, true), `isEqual(true, true) should be true!`)
  assert(isEqual(false, false), `isEqual(false, false) should be true!`)
  assert(isEqual({}, {}), `isEqual({}, {}) should be true!`)
  assert(isEqual(undefined, undefined), `isEqual(undefined, undefined) should be true!`)
  assert(isEqual(null, null), `isEqual(null, null) should be true!`)
  assert(isEqual({x: 5}, {x: 5}), `isEqual({x: 5}, {x: 5}) should be true!`)
  assert(isEqual([2, 3, 4], [2, 3, 4]), `isEqual([2, 3, 4], [2, 3, 4]) should be true!`)

  let a = {name: "James", friends: ["Bill", "Sally"]}
  let b = {name: "James", friends: ["Bill", "Sally"]}
  assert(isEqual(a, b), `isEqual(a, b) should be true!`)

  let others = [2, -3.5, "foo", true, false, {}, undefined, null, {x: 5}, [2, 3, 4], {name: "James", friends: ["Bill", "Sally"]}]

  for (let i=0; i<others.length-1; i++){
    for (let j=i; j<others.length; j++){
      if (i !== j){
        a = others[i]
        b = others[j]
        assert(!isEqual(a, b), `isEqual(a, b) should be false! (a: ${JSON.stringify(a)}, b: ${JSON.stringify(b)})`)
      }
    }
  }

  console.log("All tests passed!")
}

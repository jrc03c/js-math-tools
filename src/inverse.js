let assert = require("./assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let shape = require("./shape.js")
let slice = require("./slice.js")
let dot = require("./dot.js")
let add = require("./add.js")
let scale = require("./scale.js")
let append = require("./append.js")
let range = require("./range.js")

function inverse(x){
  assert(!isUndefined(x), "You must pass a square 2D array into the `inverse` function!")
  assert(isArray(x), "You must pass a square 2D array into the `inverse` function!")
  flatten(x).forEach(v => assert(isNumber(v), "The array passed into the `inverse` function must contain only numbers!"))

  let xShape = shape(x)
  assert(xShape.length === 2, "The array passed into the `inverse` function must be exactly two-dimensional and square!")
  assert(xShape[0] === xShape[1], "The array passed into the `inverse` function must be exactly two-dimensional and square!")
  assert(xShape[0] >= 0, "The array passed into the `inverse` function must be exactly two-dimensional and square!")

  // https://en.wikipedia.org/wiki/Invertible_matrix#Blockwise_inversion
  if (xShape[0] === 0){
    return x
  } else if (xShape[0] === 1){
    assert(x[0][0] !== 0, "This matrix cannot be inverted!")
    return 1 / x[0][0]
  } else if (xShape[0] === 2){
    let a = x[0][0]
    let b = x[0][1]
    let c = x[1][0]
    let d = x[1][1]

    let det = a * d - b * c
    assert(det !== 0, "This matrix cannot be inverted!")

    let out = [[d, -b], [-c, a]]
    return scale(out, 1 / det)
  } else if (xShape[0] > 1){
    let times = (a, b) => (isNumber(a) || isNumber(b)) ? scale(a, b) : dot(a, b)

    for (let divider=1; divider<xShape[0]-1; divider++){
      try {
        let A = slice(x, [range(0, divider), range(0, divider)])
        let B = slice(x, [range(0, divider), range(divider, xShape[0])])
        let C = slice(x, [range(divider, xShape[0]), range(0, divider)])
        let D = slice(x, [range(divider, xShape[0]), range(divider, xShape[0])])

        let AInv = inverse(A)
        let CompInv = inverse(add(D, times(-1, times(times(C, AInv), B))))

        let topLeft = add(AInv, times(times(times(times(AInv, B), CompInv), C), AInv))
        let topRight = times(-1, times(times(AInv, B), CompInv))
        let bottomLeft = times(-1, times(times(CompInv, C), AInv))
        let bottomRight = CompInv

        let out = append(append(topLeft, topRight, 1), append(bottomLeft, bottomRight, 1), 0)
        return out
      } catch(e){}
    }

    assert(false, "This matrix cannot be inverted!")
  }
}

module.exports = inverse

// tests
if (!module.parent && typeof(window) === "undefined"){
  let identity = require("./identity.js")
  let isEqual = require("./is-equal.js")
  let normal = require("./normal.js")
  let random = require("./random.js")
  let distance = require("./distance.js")
  let round = require("./round.js")
  let zeros = require("./zeros.js")

  let x = normal([10, 10])
  let xinv = inverse(x)
  assert(distance(identity(10), dot(x, xinv)) < 1e-5, `FAIL!`)

  x = random([20, 20])
  xinv = inverse(x)
  assert(distance(identity(20), dot(x, xinv)) < 1e-5, `FAIL!`)

  x = round(add(scale(normal([10, 10]), 10), 20))
  xinv = inverse(x)
  assert(distance(identity(10), dot(x, xinv)) < 1e-5, `FAIL!`)

  x = identity(10)
  xinv = inverse(x)
  assert(distance(identity(10), dot(x, xinv)) < 1e-5, `FAIL!`)

  let hasFailed

  try {
    hasFailed = false
    inverse()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse() should have failed!`)

  try {
    hasFailed = false
    inverse(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse(234) should have failed!`)

  try {
    hasFailed = false
    inverse("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse("foo") should have failed!`)

  try {
    hasFailed = false
    inverse(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse(true) should have failed!`)

  try {
    hasFailed = false
    inverse({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse({}) should have failed!`)

  try {
    hasFailed = false
    inverse(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    inverse(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse(foo) should have failed!`)

  try {
    hasFailed = false
    x = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    inverse(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) should have failed!`)

  try {
    hasFailed = false
    inverse(zeros([10, 10]))
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `inverse(zeros([10, 10])) should have failed!`)

  console.log("All tests passed!")
}

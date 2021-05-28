const copy = require("./copy.js")
const normal = require("./normal.js")
const isEqual = require("./is-equal.js")
const isTheSameObject = (a, b) => a === b

function isACopy(a, b) {
  if (typeof a === "object" && typeof b === "object" && a !== null) {
    return isEqual(a, b) && !isTheSameObject(a, b)
  } else {
    return isEqual(a, b)
  }
}

test("copies a number", () => {
  expect(isACopy(234, copy(234))).toBe(true)
})

test("copies a boolean", () => {
  expect(isACopy(true, copy(true))).toBe(true)
})

test("copies a string", () => {
  expect(isACopy("foo", copy("foo"))).toBe(true)
})

test("copies an array", () => {
  expect(isACopy([2, 3, 4], copy([2, 3, 4]))).toBe(true)
})

test("copies `undefined` and `null`", () => {
  expect(isACopy(undefined, copy(undefined))).toBe(true)
  expect(isACopy(null, copy(null))).toBe(true)
})

test("copies an array of random values", () => {
  const x = normal([10, 10, 10])
  expect(isACopy(x, copy(x))).toBe(true)
})

test("copies an object", () => {
  const x = {
    foo: normal([5, 5, 5, 5]),
    name: "Josh",
    position: { x: 234.5, y: 567.8, z: -890.1 },
  }

  expect(isACopy(x, copy(x))).toBe(true)
})

test("copies a function", () => {
  const double = x => x * 2
  expect(isACopy(double, copy(double))).toBe(true)
})

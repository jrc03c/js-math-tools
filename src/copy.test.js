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

test("tests that the `copy` function isn't tripped up by cyclic references", () => {
  const a = [2]
  a.push(a)
  a.push(3)

  const bTrue = [2, `<reference to "/">`, 3]
  const bPred = copy(a)
  expect(bPred).toStrictEqual(bTrue)

  const c = { hello: "world" }
  c.self = c

  const dTrue = { hello: "world", self: `<reference to "/">` }
  const dPred = copy(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = { this: { is: { a: "test" } } }
  e.this.is.not = e.this.is
  e.here = { it: { is: { again: e.this.is } } }

  const fTrue = {
    this: { is: { a: "test", not: `<reference to "/this/is">` } },
    here: {
      it: { is: { again: { a: "test", not: `<reference to "/this/is">` } } },
    },
  }

  const fPred = copy(e)
  expect(isEqual(fPred, fTrue)).toBe(true)
})

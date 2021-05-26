const lerp = require("./lerp.js")
const normal = require("./normal.js")

test("lerps from one number to another", () => {
  const a = 0
  const b = 1
  const f = 1
  const c = lerp(a, b, f)
  expect(c).toBe(1)
})

test("lerps from one number to another", () => {
  const a = -1
  const b = 1
  const f = 0.5
  const c = lerp(a, b, f)
  expect(c).toBe(0)
})

test("lerps from one number to another", () => {
  const a = -100
  const b = 100
  const f = 0.75
  const c = lerp(a, b, f)
  expect(c).toBe(50)
})

test("lerps from one array of values to another using an array of fractions", () => {
  const a = [1, 2, 3]
  const b = [2, 3, 4]
  const f = [0.5, 0.75, 0.9]
  const cTrue = [1.5, 2.75, 3.9]
  const cPred = lerp(a, b, f)
  expect(cPred).toStrictEqual(cTrue)
})

test("lerps from one tensor of values to another using a tensor of fractions", () => {
  const a = normal([5, 5, 5, 5])
  const b = normal([5, 5, 5, 5])
  const f = normal([5, 5, 5, 5])

  expect(() => {
    lerp(a, b, f)
  }).not.toThrow()
})

test("returns NaN when attempting to lerp using non-numerical values", () => {
  expect(lerp(3, 4, "foo")).toBeNaN()
  expect(lerp({}, {}, {})).toBeNaN()

  let foo
  expect(lerp(foo, foo, foo)).toBeNaN()

  let fn = () => {}
  expect(lerp(fn, fn, fn)).toBeNaN()

  expect(lerp(1, 2)).toBeNaN()
})

test("throws an error when attempting to lerp using arrays of different sizes", () => {
  expect(() => {
    lerp([1], [2, 3], 0.75)
  }).toThrow()
})

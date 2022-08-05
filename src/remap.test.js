const remap = require("./remap.js")
const normal = require("./normal.js")

test("remaps a single value from one range to another", () => {
  const x = 1
  const a = 0
  const b = 2
  const c = 0
  const d = 10
  const yTrue = 5
  const yPred = remap(x, a, b, c, d)
  expect(yPred).toBe(yTrue)
})

test("remaps a single value from one range to another", () => {
  const x = 2
  const a = 1
  const b = 3
  const c = 100
  const d = 500
  const yTrue = 300
  const yPred = remap(x, a, b, c, d)
  expect(yPred).toBe(yTrue)
})

test("remaps an array of values from one range to another", () => {
  const x = [1, 2, 3]
  const a = 0
  const b = 4
  const c = 100
  const d = 500
  const yTrue = [200, 300, 400]
  const yPred = remap(x, a, b, c, d)
  expect(yPred).toStrictEqual(yTrue)
})

test("remaps using a bunch of arrays", () => {
  const x = normal([5, 5, 5])
  const a = normal([5, 5, 5])
  const b = normal([5, 5, 5])
  const c = normal([5, 5, 5])
  const d = normal([5, 5, 5])

  expect(() => {
    remap(x, a, b, c, d)
  }).not.toThrow()
})

test("returns NaN when attempting to remap using non-numerical values", () => {
  expect(remap()).toBeNaN()
  expect(remap(1, 2, 3, 4, "five")).toBeNaN()
  expect(remap("one", 2, 3, 4, 5)).toBeNaN()
  expect(remap(true, false, () => {}, {}, null)).toBeNaN()
})

test("throws an error when attempting to remap using arrays of different shapes", () => {
  expect(() => {
    remap([1, 2], [3, 4, 5], 6, 7, 8)
  }).toThrow()
})

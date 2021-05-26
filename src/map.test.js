const map = require("./map.js")
const normal = require("./normal.js")

test("maps a single value from one range to another", () => {
  const x = 1
  const a = 0
  const b = 2
  const c = 0
  const d = 10
  const yTrue = 5
  const yPred = map(x, a, b, c, d)
  expect(yPred).toBe(yTrue)
})

test("maps a single value from one range to another", () => {
  const x = 2
  const a = 1
  const b = 3
  const c = 100
  const d = 500
  const yTrue = 300
  const yPred = map(x, a, b, c, d)
  expect(yPred).toBe(yTrue)
})

test("maps an array of values from one range to another", () => {
  const x = [1, 2, 3]
  const a = 0
  const b = 4
  const c = 100
  const d = 500
  const yTrue = [200, 300, 400]
  const yPred = map(x, a, b, c, d)
  expect(yPred).toStrictEqual(yTrue)
})

test("maps using a bunch of arrays", () => {
  const x = normal([5, 5, 5])
  const a = normal([5, 5, 5])
  const b = normal([5, 5, 5])
  const c = normal([5, 5, 5])
  const d = normal([5, 5, 5])

  expect(() => {
    map(x, a, b, c, d)
  }).not.toThrow()
})

test("returns NaN when attempting to map using non-numerical values", () => {
  expect(map()).toBeNaN()
  expect(map(1, 2, 3, 4, "five")).toBeNaN()
  expect(map("one", 2, 3, 4, 5)).toBeNaN()
  expect(map(true, false, () => {}, {}, null)).toBeNaN()
})

test("throws an error when attempting to map using arrays of different shapes", () => {
  expect(() => {
    map([1, 2], [3, 4, 5], 6, 7, 8)
  }).toThrow()
})

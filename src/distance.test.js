const distance = require("./distance.js")
const normal = require("./normal.js")
const sqrt = require("./sqrt.js")

test("gets the distance between two vectors", () => {
  const a = [4, 6]
  const b = [1, 2]
  expect(distance(a, b)).toBe(5)
})

test("gets the distance between two matrices", () => {
  const a = [
    [1, 2],
    [3, 4],
  ]

  const b = [
    [5, 10],
    [15, 20],
  ]

  expect(distance(a, b)).toBe(sqrt(16 + 64 + 144 + 256))
})

test("gets the distance between a tensor and itself", () => {
  const a = normal([5, 5, 5, 5])
  expect(distance(a, a)).toBe(0)
})

test("returns NaN when attempting to get the distance between tensors containing non-numerical values", () => {
  expect(distance([1, 2], [3, "four"])).toBeNaN()
})

test("returns NaN when calling the `distance` function without arguments", () => {
  expect(distance()).toBeNaN()
})

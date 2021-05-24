const append = require("./append.js")
const isEqual = require("./is-equal.js")
const normal = require("./normal.js")
const range = require("./range.js")
const slice = require("./slice.js")

test("appends one vector to another to produce a long vector", () => {
  const a = [2, 3, 4]
  const b = [5, 6, 7]
  const axis = 0
  const yTrue = [2, 3, 4, 5, 6, 7]
  const yPred = append(a, b, axis)
  expect(yPred).toStrictEqual(yTrue)
})

test("appends two matrices together vertically", () => {
  const a = [[2, 3, 4]]
  const b = [[5, 6, 7]]
  const axis = 0
  const yTrue = [
    [2, 3, 4],
    [5, 6, 7],
  ]
  const yPred = append(a, b, axis)
  expect(yPred).toStrictEqual(yTrue)
})

test("appends two matrices together horizontally", () => {
  const a = [[2, 3, 4]]
  const b = [[5, 6, 7]]
  const axis = 1
  const yTrue = [[2, 3, 4, 5, 6, 7]]
  const yPred = append(a, b, axis)
  expect(yPred).toStrictEqual(yTrue)
})

test("appends two more matrices together vertically", () => {
  const yTrue = normal([10, 5])
  const a = slice(yTrue, [range(0, 3), null])
  const b = slice(yTrue, [range(3, 10), null])
  const axis = 0
  const yPred = append(a, b, axis)
  expect(yPred).toStrictEqual(yTrue)
})

test("appends two more matrices together horizontally", () => {
  const yTrue = normal([5, 10])
  const a = slice(yTrue, [null, range(0, 3)])
  const b = slice(yTrue, [null, range(3, 10)])
  const axis = 1
  const yPred = append(a, b, axis)
  expect(yPred).toStrictEqual(yTrue)
})

test("throw an error when calling the `append` function without any arguments", () => {
  expect(() => {
    append()
  }).toThrow()
})

test("throws an error when attempting to append matrices of mismatched shapes", () => {
  expect(() => {
    append(normal([2, 3]), normal([4, 5]), 0)
  }).toThrow()
})

test("throws an error when attempting to append matrices of mismatched shapes (again)", () => {
  expect(() => {
    append(normal([3, 3]), normal([3, 2]), 0)
  }).toThrow()
})

test("throws an error when attempting to append matrices of mismatched shapes (yet again)", () => {
  expect(() => {
    append(normal([3, 2]), normal([2, 2]), 1)
  }).toThrow()
})

test("throws an error when attempting to append matrices along an axis > 1", () => {
  expect(() => {
    append(normal([5, 5], normal([5, 5])), 2)
  }).toThrow()
})

test("throws an error when attempting to append tensors with dimensions > 2", () => {
  expect(() => {
    append(normal([2, 3, 4]), normal([2, 3, 4]), 0)
  }).toThrow()
})

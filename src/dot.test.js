const dot = require("./dot.js")
const normal = require("./normal.js")

test("gets the dot product of two vectors", () => {
  const a = [2, 3, 4]
  const b = [5, 6, 7]
  const yTrue = 56
  const yPred = dot(a, b)
  expect(yPred).toBe(yTrue)
})

test("gets the dot product of two matrices", () => {
  const a = [
    [2, 3],
    [4, 5],
    [6, 7],
  ]
  const b = [
    [8, 9, 10],
    [11, 12, 13],
  ]
  const yTrue = [
    [49, 54, 59],
    [87, 96, 105],
    [125, 138, 151],
  ]
  const yPred = dot(a, b)
  expect(yPred).toStrictEqual(yTrue)
})

test("gets the dot product of a vector and a matrix", () => {
  const a = [4, 3, 2, 1]
  const b = [
    [12, 11],
    [10, 9],
    [8, 7],
    [6, 5],
  ]
  const yTrue = [100, 90]
  const yPred = dot(a, b)
  expect(yPred).toStrictEqual(yTrue)
})

test("gets the dot product of a matrix and a vector", () => {
  const a = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
  ]
  const b = [11, 12, 13, 14, 15]
  const yTrue = [205, 530]
  const yPred = dot(a, b)
  expect(yPred).toStrictEqual(yTrue)
})

test("throw an error when `dot` is called without arguments", () => {
  expect(() => {
    dot()
  }).toThrow()
})

test("throw an error when `dot` is called with non-numerical / non-array values", () => {
  expect(() => {
    dot(2, 3)
  }).toThrow()

  expect(() => {
    dot(true, false)
  }).toThrow()

  expect(() => {
    dot("foo", "bar")
  }).toThrow()

  expect(() => {
    dot(normal([2, 3, 4]))
  }).toThrow()
})

test("throw an error when attempting to get the dot product of matrices with mis-aligned axes", () => {
  expect(() => {
    dot(normal([2, 3]), normal([2, 3]))
  }).toThrow()
})

const flatten = require("./flatten.js")
const normal = require("./normal.js")
const shape = require("./shape.js")

test("flattens an already-flattened array", () => {
  const x = [2, 3, 4]
  const yTrue = [2, 3, 4]
  const yPred = flatten(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("flattens a matrix", () => {
  const x = [
    [2, 3, 4],
    [5, 6, 7],
  ]
  const yTrue = [2, 3, 4, 5, 6, 7]
  const yPred = flatten(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("flattens a tensor", () => {
  const x = normal([2, 3, 4, 5])
  const yPred = flatten(x)
  expect(yPred.length).toBe(120)
  expect(shape(yPred).length).toBe(1)
})

test("throws an error when attempting to flatten non-arrays", () => {
  expect(() => {
    flatten()
  }).toThrow()

  expect(() => {
    flatten("foo")
  }).toThrow()

  expect(() => {
    flatten(123)
  }).toThrow()

  expect(() => {
    flatten(true)
  }).toThrow()

  expect(() => {
    flatten({})
  }).toThrow()

  expect(() => {
    flatten(() => {})
  }).toThrow()
})

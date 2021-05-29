const reshape = require("./reshape.js")
const shape = require("./shape.js")
const normal = require("./normal.js")
const flatten = require("./flatten.js")
const range = require("./range.js")

test("", () => {
  const x = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ]

  const yTrue = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
  ]

  const yPred = reshape(x, shape(yTrue))
  expect(yPred).toStrictEqual(yTrue)
  expect(shape(yPred)).toStrictEqual(shape(yTrue))
})

test("", () => {
  const x = normal([2, 3, 4, 5])
  const yPred = reshape(x, [5, 12, 2])
  expect(shape(yPred)).toStrictEqual([5, 12, 2])
  expect(flatten(yPred)).toStrictEqual(flatten(x))
})

test("", () => {
  const x = range(0, 100)
  const yPred = reshape(x, [20, 5])
  expect(yPred[0]).toStrictEqual([0, 1, 2, 3, 4])
})

test("", () => {
  const x = normal([5, 4, 3, 2])
  const yPred = reshape(x, 5 * 4 * 3 * 2)
  expect(yPred).toStrictEqual(flatten(x))
})

test("error", () => {
  expect(() => {
    reshape()
  }).toThrow()

  expect(() => {
    reshape("foo")
  }).toThrow()

  expect(() => {
    reshape([2, 3, 4], "foo")
  }).toThrow()

  expect(() => {
    reshape(true, false)
  }).toThrow()

  expect(() => {
    reshape(null, undefined)
  }).toThrow()

  expect(() => {
    reshape({}, () => {})
  }).toThrow()

  expect(() => {
    reshape(range(0, 100), [-5, -20])
  }).toThrow()
})

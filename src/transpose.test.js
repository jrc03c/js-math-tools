const normal = require("./normal.js")
const transpose = require("./transpose.js")

test("transposes a vector", () => {
  const x = [2, 3, 4]
  const yTrue = [4, 3, 2]
  const yPred = transpose(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("transposes a matrix of numbers", () => {
  const x = [
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10],
  ]

  const yTrue = [
    [2, 5, 8],
    [3, 6, 9],
    [4, 7, 10],
  ]

  const yPred = transpose(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("transposes a matrix of letters", () => {
  const x = [
    ["a", "b", "c", "d"],
    ["e", "f", "g", "h"],
  ]

  const yTrue = [
    ["a", "e"],
    ["b", "f"],
    ["c", "g"],
    ["d", "h"],
  ]

  const yPred = transpose(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("throws an error when attempting to transpose non-vectors and non-matrices", () => {
  expect(() => {
    transpose()
  }).toThrow()

  expect(() => {
    transpose(normal([5, 5, 5, 5]))
  }).toThrow()

  expect(() => {
    transpose(123)
  }).toThrow()

  expect(() => {
    transpose("foo")
  }).toThrow()

  expect(() => {
    transpose(true)
  }).toThrow()

  expect(() => {
    transpose(false)
  }).toThrow()

  expect(() => {
    transpose(null)
  }).toThrow()

  expect(() => {
    transpose(undefined)
  }).toThrow()

  expect(() => {
    transpose(() => {})
  }).toThrow()

  expect(() => {
    transpose({})
  }).toThrow()

  expect(transpose([])).toStrictEqual([])
})

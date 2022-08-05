const normal = require("./normal.js")
const shape = require("./shape.js")

test("gets the shape of some arrays", () => {
  expect(shape(normal(500))).toStrictEqual([500])
  expect(shape(normal([2, 3, 4]))).toStrictEqual([2, 3, 4])
})

test("throws an error when attempting to get the shapes of malformed arrays or non-arrays", () => {
  expect(() => {
    shape()
  }).toThrow()

  expect(() => {
    shape([
      [2, 3, 4],
      [5, 6, 7, 8],
    ])
  }).toThrow()

  expect(() => {
    shape("foo")
  }).toThrow()

  expect(() => {
    shape(true)
  }).toThrow()

  expect(() => {
    shape(false)
  }).toThrow()

  expect(() => {
    shape(() => {})
  }).toThrow()

  expect(() => {
    shape(234)
  }).toThrow()

  expect(() => {
    shape({})
  }).toThrow()

  expect(() => {
    shape(null)
  }).toThrow()

  expect(() => {
    shape(undefined)
  }).toThrow()
})

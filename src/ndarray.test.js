const dropMissing = require("./drop-missing.js")
const flatten = require("./flatten.js")
const ndarray = require("./ndarray.js")
const shape = require("./shape.js")

test("creates ndarrays of various shapes", () => {
  expect(ndarray(3).length).toBe(3)
  expect(ndarray([3]).length).toBe(3)
  expect(ndarray([3, 2]).length).toBe(3)
  expect(flatten(ndarray([2, 3, 4])).length).toBe(24)
  expect(dropMissing(flatten(ndarray([2, 3, 4]))).length).toBe(0)
  expect(shape(ndarray([2, 3, 4]))).toStrictEqual([2, 3, 4])
})

test("throws an error when attempting to create an ndarray with non-whole-number values", () => {
  expect(() => {
    ndarray()
  }).toThrow()

  expect(() => {
    ndarray(-1)
  }).toThrow()

  expect(() => {
    ndarray([-2, -3, -4])
  }).toThrow()

  expect(() => {
    ndarray({})
  }).toThrow()

  expect(() => {
    ndarray(true)
  }).toThrow()

  expect(() => {
    ndarray(false)
  }).toThrow()

  expect(() => {
    ndarray(null)
  }).toThrow()

  expect(() => {
    ndarray(undefined)
  }).toThrow()

  expect(() => {
    ndarray(() => {})
  }).toThrow()
})

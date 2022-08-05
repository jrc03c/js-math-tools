const ones = require("./ones.js")
const set = require("./set.js")
const shape = require("./shape.js")

test("gets a tensor of ones", () => {
  const x = ones([2, 3, 4, 5])
  expect(set(x)).toStrictEqual([1])
  expect(shape(x)).toStrictEqual([2, 3, 4, 5])
})

test("throws an error when attempting to get ones with non-whole-number arguments", () => {
  expect(() => {
    ones(-1)
  }).toThrow()

  expect(() => {
    ones([-2, -3, -4])
  }).toThrow()

  expect(() => {
    ones({})
  }).toThrow()

  expect(() => {
    ones(true)
  }).toThrow()

  expect(() => {
    ones(false)
  }).toThrow()

  expect(() => {
    ones(null)
  }).toThrow()

  expect(() => {
    ones(undefined)
  }).toThrow()

  expect(() => {
    ones(() => {})
  }).toThrow()
})

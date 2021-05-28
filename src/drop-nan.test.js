const dropNaN = require("./drop-nan.js")
const normal = require("./normal.js")

test("drops NaN values from a vector with no NaN values", () => {
  const a = [1, 2, 3, 4, 5]
  const aTemp = dropNaN(a)
  expect(aTemp).toStrictEqual(a)
})

test("drops NaN values from a vector with NaN values", () => {
  const a = [1, 2, "foo", true, 5]
  const aTemp = dropNaN(a)
  expect(aTemp).toStrictEqual([1, 2, 5])
})

test("drops NaN values from a vector with only NaN values", () => {
  const a = ["foo", true, () => {}, {}, null]
  const aTemp = dropNaN(a)
  expect(aTemp.length).toBe(0)
})

test("throw an error when attempting to drop NaN values from non-vectors", () => {
  expect(() => {
    dropNaN()
  }).toThrow()

  expect(() => {
    dropNaN(normal([10, 10, 10]))
  }).toThrow()

  expect(() => {
    dropNaN("foo")
  }).toThrow()

  expect(() => {
    dropNaN(true)
  }).toThrow()

  expect(() => {
    dropNaN(1, 2, 3)
  }).toThrow()
})

const dropMissing = require("./drop-missing.js")
const normal = require("./normal.js")

test("drops missing values from a vector with no missing values", () => {
  const a = [1, 2, 3, 4, 5]
  const aTemp = dropMissing(a)
  expect(aTemp).toStrictEqual(a)
})

test("drops missing values from a vector with missing values", () => {
  const a = [1, 2, null, undefined, 5]
  const aTemp = dropMissing(a)
  expect(aTemp).toStrictEqual([1, 2, 5])
})

test("drops missing values from a vector with only missing values", () => {
  const a = [null, null, null, undefined, undefined]
  const aTemp = dropMissing(a)
  expect(aTemp.length).toBe(0)
})

test("throw an error when attempting to drop missing values from non-vectors", () => {
  expect(() => {
    dropMissing()
  }).toThrow()

  expect(() => {
    dropMissing(normal([10, 10, 10]))
  }).toThrow()

  expect(() => {
    dropMissing("foo")
  }).toThrow()

  expect(() => {
    dropMissing(true)
  }).toThrow()

  expect(() => {
    dropMissing(1, 2, 3)
  }).toThrow()
})

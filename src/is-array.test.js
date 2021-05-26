const isArray = require("./is-array.js")
class SubArray extends Array {}

test("checks to see if various things are arrays", () => {
  expect(isArray([])).toBe(true)
  expect(isArray([2, 3, 4])).toBe(true)
  expect(isArray(new Array())).toBe(true)
  expect(isArray(new SubArray())).toBe(true)

  expect(isArray({})).toBe(false)
  expect(isArray({ push: () => {} })).toBe(false)
  expect(isArray("foo")).toBe(false)
  expect(isArray(true)).toBe(false)
  expect(isArray(false)).toBe(false)
  expect(isArray(() => {})).toBe(false)
  expect(isArray(3)).toBe(false)
})

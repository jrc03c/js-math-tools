const isString = require("./is-string.js")

test("checks to see if various things are strings", () => {
  expect(isString("35")).toBe(true)
  expect(isString("foo")).toBe(true)
  expect(isString(`hello`)).toBe(true)

  expect(isString(3)).toBe(false)
  expect(isString(-3.5)).toBe(false)
  expect(isString([2, 3, 4])).toBe(false)
  expect(isString({ x: 5 })).toBe(false)
  expect(isString(() => {})).toBe(false)
  expect(isString(null)).toBe(false)
  expect(isString(undefined)).toBe(false)
  expect(isString(true)).toBe(false)
  expect(isString(false)).toBe(false)
})

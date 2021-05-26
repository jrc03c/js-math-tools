const isNumber = require("./is-number.js")

test("checks to see if various things are numbers", () => {
  expect(isNumber(3)).toBe(true)
  expect(isNumber(-3.5)).toBe(true)
  expect(isNumber(2573.2903482093482035023948)).toBe(true)
  expect(isNumber(Infinity)).toBe(true)
  expect(isNumber(Math.PI)).toBe(true)

  expect(isNumber("35")).toBe(false)
  expect(isNumber("foo")).toBe(false)
  expect(isNumber([2, 3, 4])).toBe(false)
  expect(isNumber({ x: 5 })).toBe(false)
  expect(isNumber(null)).toBe(false)
  expect(isNumber(undefined)).toBe(false)
  expect(isNumber(true)).toBe(false)
  expect(isNumber(false)).toBe(false)
})

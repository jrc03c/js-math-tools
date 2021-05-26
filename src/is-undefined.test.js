const isUndefined = require("./is-undefined.js")

test("checks to see if various things are undefined", () => {
  let x
  expect(isUndefined(x)).toBe(true)
  expect(isUndefined(null)).toBe(true)
  expect(isUndefined(undefined)).toBe(true)

  expect(isUndefined("foo")).toBe(false)
  expect(isUndefined(3)).toBe(false)
  expect(isUndefined(-3.5)).toBe(false)
  expect(isUndefined([2, 3, 4])).toBe(false)
  expect(isUndefined({ x: 5 })).toBe(false)
  expect(isUndefined(() => {})).toBe(false)
  expect(isUndefined(true)).toBe(false)
  expect(isUndefined(false)).toBe(false)
})

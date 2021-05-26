const isBoolean = require("./is-boolean.js")

test("checks to see if various things are booleans", () => {
  let x
  expect(isBoolean(true)).toBe(true)
  expect(isBoolean(false)).toBe(true)
  expect(isBoolean(0 < 1)).toBe(true)
  expect(isBoolean(!!x)).toBe(true)

  expect(isBoolean("true")).toBe(false)
  expect(isBoolean("false")).toBe(false)
  expect(isBoolean(234)).toBe(false)
  expect(isBoolean(() => {})).toBe(false)
  expect(isBoolean({})).toBe(false)
  expect(isBoolean(null)).toBe(false)
  expect(isBoolean(undefined)).toBe(false)
})

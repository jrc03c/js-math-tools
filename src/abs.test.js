const abs = require("./abs.js")

test("takes absolute value of 3 to be 3", () => {
  expect(abs(3)).toBe(3)
})

test("takes absolute value of -3 to be 3", () => {
  expect(abs(-3)).toBe(3)
})

test("takes absolute value of 0 to be 0", () => {
  expect(abs(0)).toBe(0)
})

test("takes absolute value of 3.5 to be 3.5", () => {
  expect(abs(3.5)).toBe(3.5)
})

test("takes absolute value of -3.5 to be 3.5", () => {
  expect(abs(-3.5)).toBe(3.5)
})

test("takes absolute value of [2, -3, 4, -5] to be [2, 3, 4, 5]", () => {
  expect(abs([2, -3, 4, -5])).toStrictEqual([2, 3, 4, 5])
})

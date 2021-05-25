const cos = require("./cos.js")
const min = require("./min.js")
const max = require("./max.js")
const normal = require("./normal.js")
const chop = require("./chop.js")

test("gets the cosine of an array of values", () => {
  const x = normal([10000]).map(v => v * 100)
  const y = cos(x)
  expect(min(y)).toBeGreaterThanOrEqual(-1)
  expect(max(y)).toBeLessThanOrEqual(1)
})

test("gets cosine of 0 to be 1", () => {
  expect(cos(0)).toBe(1)
})

test("gets cosine of pi / 2 to be 0", () => {
  expect(chop(cos(Math.PI / 2))).toBe(0)
})

test("gets cosine of pi to be -1", () => {
  expect(cos(Math.PI)).toBe(-1)
})

test("gets cosine of 3 * pi / 2 to be 0", () => {
  expect(chop(cos((3 * Math.PI) / 2))).toBe(0)
})

test("returns NaN when attempting to take the cosine of non-numerical values", () => {
  expect(cos("foo")).toBeNaN()
})

const chop = require("./chop.js")
const cos = require("./cos.js")
const max = require("./max.js")
const min = require("./min.js")
const normal = require("./normal.js")

test("gets the cosine of an array of values", () => {
  const x = normal([10000]).map(v => v * 100)
  const y = cos(x)
  expect(min(y)).toBeGreaterThanOrEqual(-1)
  expect(max(y)).toBeLessThanOrEqual(1)
})

test("gets cosine of common angles", () => {
  expect(cos(0)).toBe(1)
  expect(chop(cos(Math.PI / 2))).toBe(0)
  expect(cos(Math.PI)).toBe(-1)
  expect(chop(cos((3 * Math.PI) / 2))).toBe(0)
})

test("returns NaN when attempting to take the cosine of non-numerical values", () => {
  expect(cos()).toBeNaN()
  expect(cos("foo")).toBeNaN()
  expect(cos(true)).toBeNaN()
  expect(cos(false)).toBeNaN()
  expect(cos(null)).toBeNaN()
  expect(cos(undefined)).toBeNaN()
  expect(cos(() => {})).toBeNaN()
  expect(cos({})).toBeNaN()
  expect(cos([])).toStrictEqual([])
})

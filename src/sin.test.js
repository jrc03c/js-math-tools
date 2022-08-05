const chop = require("./chop.js")
const max = require("./max.js")
const min = require("./min.js")
const normal = require("./normal.js")
const sin = require("./sin.js")

test("gets the sine of an array of values", () => {
  const x = normal([10000]).map(v => v * 100)
  const y = sin(x)
  expect(min(y)).toBeGreaterThanOrEqual(-1)
  expect(max(y)).toBeLessThanOrEqual(1)
})

test("gets sine of common angles", () => {
  expect(chop(sin(0))).toBe(0)
  expect(sin(Math.PI / 2)).toBe(1)
  expect(chop(sin(Math.PI))).toBe(0)
  expect(sin((3 * Math.PI) / 2)).toBe(-1)
})

test("returns NaN when attempting to take the sine of non-numerical values", () => {
  expect(sin()).toBeNaN()
  expect(sin("foo")).toBeNaN()
  expect(sin(true)).toBeNaN()
  expect(sin(false)).toBeNaN()
  expect(sin(null)).toBeNaN()
  expect(sin(undefined)).toBeNaN()
  expect(sin(() => {})).toBeNaN()
  expect(sin({})).toBeNaN()
  expect(sin([])).toStrictEqual([])
})

const float = require("./float.js")

test("parses some float values", () => {
  expect(float(3.5)).toBe(3.5)
  expect(float(3)).toBe(3)
  expect(float(5 / 10)).toBe(0.5)
  expect(float("-17.4")).toBe(-17.4)
  expect(float("234")).toBe(234)
  expect(float([2, 3, "4"])).toStrictEqual([2, 3, 4])
  expect(float([])).toStrictEqual([])
})

test("returns NaN when attempting to parse unusual values as floats", () => {
  expect(float()).toBeNaN()
  expect(float("foo")).toBeNaN()
  expect(float("3.5foo")).toBeNaN()
  expect(float("foo3.5")).toBeNaN()
  expect(float({})).toBeNaN()
  expect(float(() => {})).toBeNaN()
})

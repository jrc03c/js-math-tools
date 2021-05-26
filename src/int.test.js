const int = require("./int.js")

test("parses some int values", () => {
  expect(int(3.5)).toBe(3)
  expect(int(3)).toBe(3)
  expect(int(9 / 10)).toBe(0)
  expect(int("-17.4")).toBe(-17)
  expect(int("234")).toBe(234)
  expect(int([2, 3, "4"])).toStrictEqual([2, 3, 4])
  expect(int([])).toStrictEqual([])
})

test("returns NaN when attempting to parse unusual values as ints", () => {
  expect(int()).toBeNaN()
  expect(int("foo")).toBeNaN()
  expect(int("35foo")).toBeNaN()
  expect(int("foo35")).toBeNaN()
  expect(int({})).toBeNaN()
  expect(int(() => {})).toBeNaN()
})

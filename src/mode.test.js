const mode = require("./mode.js")
const random = require("./random.js")
const round = require("./round.js")
const shuffle = require("./shuffle.js")
const scale = require("./scale.js")
const add = require("./add.js")
const normal = require("./normal.js")

test("", () => {
  expect(mode([2, 3, 3, 3, 2, 4])).toBe(3)
  expect(mode(["foo", "foo", "foo", "foo", "bar"])).toBe("foo")
  expect(mode([2, 2, 2, "foo", "foo", "foo"])).toStrictEqual([2, "foo"])
  expect(mode([1, 2, "three"])).toStrictEqual([1, 2, "three"])

  const x = round(scale(add(normal(1000), 100), 100))
  const m = mode(x)

  for (let i = 0; i < 10; i++) {
    if (typeof m === "number") {
      expect(mode(shuffle(x))).toBe(m)
    } else {
      expect(mode(shuffle(x))).toStrictEqual(m)
    }
  }
})

test("returns NaN when attempting to get the mode of non-numerical values", () => {
  expect(mode()).toBeNaN()
  expect(mode([])).toBeNaN()
  expect(mode("foo")).toBeNaN()
  expect(mode(true)).toBeNaN()
  expect(mode({})).toBeNaN()
  expect(mode(() => {})).toBeNaN()
  expect(mode(null)).toBeNaN()
  expect(mode(undefined)).toBeNaN()
})

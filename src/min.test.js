const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const min = require("./min")
const normal = require("./normal")

test("tests that the maximum value in arrays, series, and dataframes can be found correctly", () => {
  expect(min([2, 3, 4])).toBe(2)
  expect(min([-2, -3, -4])).toBe(-4)

  const a = normal(100)
  expect(min(a)).toBe(Math.min(...a))

  const b = normal([2, 3, 4, 5])
  expect(min(b)).toBe(Math.min(...flatten(b)))

  const c = new Series({ hello: normal(100) })
  expect(min(c)).toBe(min(c.values))

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(min(d)).toBe(min(d.values))

  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
  ]

  wrongs.forEach(item => {
    expect(() => min(item)).toThrow()
  })
})

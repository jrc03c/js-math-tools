const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const max = require("./max")
const normal = require("./normal")

test("tests that the maximum value in arrays, series, and dataframes can be found correctly", () => {
  const a = normal(100)
  expect(max(a)).toBe(Math.max(...a))

  const b = normal([2, 3, 4, 5])
  expect(max(b)).toBe(Math.max(...flatten(b)))

  const c = new Series({ hello: normal(100) })
  expect(max(c)).toBe(max(c.values))

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(max(d)).toBe(max(d.values))

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
    expect(() => max(item)).toThrow()
  })
})

const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const median = require("./median")
const normal = require("./normal")
const shuffle = require("./shuffle")
const sort = require("./sort")

test("tests that the median of arrays, series, and dataframes can be computed correctly", () => {
  expect(median([2, 3, 4])).toBe(3)
  expect(median([2, 3, 4, 5])).toBe(3.5)
  expect(median([2, 2, 2, 3, 3])).toBe(2)

  const a = normal(100)
  expect(median(shuffle(a))).toBe(median(sort(a)))

  const b = normal([2, 3, 4, 5])
  expect(median(b)).toBe(median(flatten(b)))

  const c = new Series({ hello: normal(100) })
  expect(median(c)).toBe(median(c.values))

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(median(d)).toBe(median(d.values))

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
    expect(() => median(item)).toThrow()
  })
})

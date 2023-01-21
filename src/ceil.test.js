const { DataFrame, Series } = require("./dataframe")
const ceil = require("./ceil")
const isEqual = require("./is-equal")
const normal = require("./normal")

test("tests that the ceiling of various values can be computed correctly", () => {
  const r = normal([50, 50])
  const s = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [0, 0],
    [1, 1],
    [2.3, 3],
    [-2.3, -2],
    [Infinity, Infinity],
    [-Infinity, -Infinity],
    [r, r.map(row => row.map(v => Math.ceil(v)))],
    [s, s.copy().apply(v => Math.ceil(v))],
    [d, d.copy().apply(col => col.apply(v => Math.ceil(v)))],
  ]

  rights.forEach(pair => {
    expect(isEqual(ceil(pair[0]), pair[1])).toBe(true)
  })

  const wrongs = [
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

  wrongs.forEach(v => {
    expect(ceil(v)).toBeNaN()
  })
})

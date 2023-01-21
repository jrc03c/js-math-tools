const { DataFrame, Series } = require("./dataframe")
const apply = require("./apply")
const exp = require("./exp")
const isEqual = require("./is-equal")
const normal = require("./normal")

test("tests that values to the power of E can be computed correctly", () => {
  const a = normal(100)
  const b = normal([10, 10])
  const c = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  const e = normal([5, 5, 5, 5])

  const rights = [
    [5, Math.exp(5)],
    [-234.567, Math.exp(-234.567)],
    [a, a.map(v => Math.exp(v))],
    [b, b.map(row => row.map(v => Math.exp(v)))],
    [c, c.copy().apply(v => Math.exp(v))],
    [d, d.copy().apply(col => col.apply(v => Math.exp(v)))],
    [e, apply(e, Math.exp)],
    [Infinity, Infinity],
    [-Infinity, 0],
  ]

  rights.forEach(pair => {
    expect(isEqual(exp(pair[0]), pair[1])).toBe(true)
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

  wrongs.forEach(item => {
    expect(exp(item)).toBeNaN()
  })
})

const { DataFrame, Series } = require("./dataframe")
const apply = require("./apply")
const float = require("./float")
const isEqual = require("./is-equal")
const normal = require("./normal")

test("tests that values can be correctly cast to floats", () => {
  const a = normal(100).map(v => v.toString())
  const bTrue = a.map(v => parseFloat(v))
  const bPred = float(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = apply(normal([2, 3, 4, 5]), v => v.toString())
  const dTrue = apply(c, v => parseFloat(v))
  const dPred = float(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: normal(100).map(v => v.toString()) })
  const fTrue = e.copy().apply(v => parseFloat(v))
  const fPred = float(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({
    foo: normal(100).map(v => v.toString()),
    bar: normal(100).map(v => v.toString()),
  })

  const hTrue = g.copy().apply(col => col.apply(v => parseFloat(v)))
  const hPred = float(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  const rights = [0, 1, 2.3, -2.3, Infinity, -Infinity]

  rights.forEach(item => {
    expect(float(item.toString())).toBe(item)
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
    expect(float(item)).toBeNaN()
  })
})

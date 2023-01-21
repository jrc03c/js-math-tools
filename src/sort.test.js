const { DataFrame, Series } = require("./dataframe")
const isEqual = require("./is-equal")
const normal = require("./normal")
const reverse = require("./reverse")
const sort = require("./sort")
const zip = require("./zip")

test("tests that arrays, Series, and DataFrames can be correctly sorted", () => {
  const a = normal(100)
  const bTrue = a.slice().sort((a, b) => a - b)
  const bPred = sort(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal([2, 3, 4, 5])
  const dTrue = c.slice().sort((a, b) => (a < b ? -1 : 1))
  const dPred = sort(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = normal(100)
  const fTrue = reverse(sort(e))
  const fPred = sort(e, (a, b) => b - a)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new Series({ hello: normal(100) })
  const hTrue = g.copy()
  const hTemp = sort(zip(hTrue.values, hTrue.index), (a, b) => a[0] - b[0])
  hTrue.values = hTemp.map(v => v[0])
  hTrue.index = hTemp.map(v => v[1])
  const hPred = sort(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = new DataFrame({ foo: normal(100), bar: normal(100) })
  const jTrue = i.copy()

  const jTemp = sort(
    zip(jTrue.values, jTrue.index),
    (a, b) => a[0][1] - b[0][1]
  )

  jTrue.values = jTemp.map(v => v[0])
  jTrue.index = jTemp.map(v => v[1])
  const jPred = sort(i, (a, b) => a.get("bar") - b.get("bar"))
  expect(isEqual(jPred, jTrue)).toBe(true)

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
    { hello: "world" },
  ]

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      expect(() => sort(a, b)).toThrow()
    })
  })
})

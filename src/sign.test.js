const { DataFrame, Series } = require("./dataframe")
const apply = require("./apply")
const isEqual = require("./is-equal")
const normal = require("./normal")
const sign = require("./sign")

test("tests that the sign of a number can be correctly identified", () => {
  expect(sign(-234.567)).toBe(-1)
  expect(sign(234.567)).toBe(1)
  expect(sign(0)).toBe(0)
  expect(sign(Infinity)).toBe(1)
  expect(sign(-Infinity)).toBe(-1)

  const a = normal(100)
  const bTrue = a.map(v => (v < 0 ? -1 : v > 0 ? 1 : 0))
  const bPred = sign(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal([2, 3, 4, 5])
  const dTrue = apply(c, v => (v < 0 ? -1 : v > 0 ? 1 : 0))
  const dPred = sign(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: normal(100) })
  const fTrue = e.copy().apply(v => (v < 0 ? -1 : v > 0 ? 1 : 0))
  const fPred = sign(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({ foo: normal(100), bar: normal(100) })

  const hTrue = g
    .copy()
    .apply(col => col.apply(v => (v < 0 ? -1 : v > 0 ? 1 : 0)))

  const hPred = sign(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

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
    expect(sign(item)).toBeNaN()
  })
})

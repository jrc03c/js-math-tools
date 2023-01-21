const { DataFrame, Series } = require("./dataframe")
const apply = require("./apply")
const isEqual = require("./is-equal")
const normal = require("./normal")
const sqrt = require("./sqrt")

test("tests that square roots can be correctly computed", () => {
  const a = normal(100)
  const bTrue = a.map(v => Math.sqrt(v))
  const bPred = sqrt(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal([2, 3, 4, 5])
  const dTrue = apply(c, v => Math.sqrt(v))
  const dPred = sqrt(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: normal(100) })
  const fTrue = e.copy().apply(v => Math.sqrt(v))
  const fPred = sqrt(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({ foo: normal(100), bar: normal(100) })
  const hTrue = g.copy().apply(col => col.apply(v => Math.sqrt(v)))
  const hPred = sqrt(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  const wrongs = [
    -234,
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
    expect(sqrt(item)).toBeNaN()
  })
})

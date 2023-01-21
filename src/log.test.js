const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random")
const apply = require("./apply")
const isEqual = require("./is-equal")
const log = require("./log")

test("tests that the log of various values can be computed correctly", () => {
  const a = random(100).map(v => v * 100 + 1)
  const bTrue = a.map(v => Math.log(v))
  const bPred = log(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = random([2, 3, 4, 5])
  const dTrue = apply(c, v => Math.log(v))
  const dPred = log(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: random(100) })
  const fTrue = e.copy().apply(v => Math.log(v))
  const fPred = log(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({ foo: random(100), bar: random(100) })
  const hTrue = g.copy().apply(col => col.apply(v => Math.log(v)))
  const hPred = log(g)
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
    expect(log(item)).toBeNaN()
  })
})

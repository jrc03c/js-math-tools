const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const normal = require("./normal")
const pow = require("./pow")
const reshape = require("./reshape")

test("tests that values raised to powers can be computed correctly", () => {
  expect(pow(2, 3)).toBe(8)
  expect(pow(3, 2)).toBe(9)
  expect(pow([2, 3, 4], 3)).toStrictEqual([8, 27, 64])
  expect(pow(2, [3, 4, 5])).toStrictEqual([8, 16, 32])

  const a = normal([2, 3, 4, 5])
  const b = normal([2, 3, 4, 5])
  const aFlat = flatten(a)
  const bFlat = flatten(b)
  const cFlat = aFlat.map((v, i) => Math.pow(v, bFlat[i]))
  const cTrue = reshape(cFlat, [2, 3, 4, 5])
  const cPred = pow(a, b)
  expect(isEqual(cPred, cTrue)).toBe(true)

  const d = new Series({ hello: normal(100) })
  const eTrue1 = d.copy().apply(v => Math.pow(v, 3))
  const ePred1 = pow(d, 3)
  const eTrue2 = d.copy().apply(v => Math.pow(3, v))
  const ePred2 = pow(3, d)
  expect(isEqual(ePred1, eTrue1)).toBe(true)
  expect(isEqual(ePred2, eTrue2)).toBe(true)
  expect(isEqual(pow(d, d), new Series(pow(d.values, d.values)))).toBe(true)

  const f = new DataFrame({ foo: normal(100), bar: normal(100) })
  const g = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(pow(f, g), new DataFrame(pow(f.values, g.values)))).toBe(true)

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

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      expect(pow(a, b)).toBeNaN()
    })
  })
})

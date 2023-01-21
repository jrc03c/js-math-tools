const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random")
const dropMissing = require("./drop-missing")
const isEqual = require("./is-equal")
const isUndefined = require("./is-undefined")
const normal = require("./normal")

test("tests that missing values can be dropped correctly", () => {
  const a = normal(100)
  expect(isEqual(dropMissing(a), a)).toBe(true)

  const b = []
  const cTrue = []

  for (let i = 0; i < 100; i++) {
    const v = normal()

    if (random() < 0.1) {
      b.push(null)
    } else {
      b.push(v)
      cTrue.push(v)
    }
  }

  const cPred = dropMissing(b)
  expect(isEqual(cPred, cTrue)).toBe(true)

  const d = [
    [2, 3, 4],
    [5, 6, null, 8],
    [9, null, 11, null, null],
  ]

  const eTrue = [
    [2, 3, 4],
    [5, 6, 8],
    [9, 11],
  ]

  const ePred = dropMissing(d)
  expect(isEqual(ePred, eTrue)).toBe(true)

  const f = new Series(normal(100).map(v => (random() < 0.5 ? null : v)))
  const gTrue = new Series(f.values.filter(v => !isUndefined(v)))
  const gPred = dropMissing(f)
  gTrue._index = gPred._index
  expect(isEqual(gPred, gTrue)).toBe(true)

  const g = new DataFrame(
    normal([10, 10]).map(row => row.map(v => (random() < 0.05 ? null : v)))
  )

  const hTrue = new DataFrame(
    g.values.filter(row => row.every(v => !isUndefined(v)))
  )

  const hPred = dropMissing(g)
  hTrue._index = hPred._index
  expect(isEqual(hPred, hTrue)).toBe(true)

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
    expect(() => dropMissing(item)).toThrow()
  })
})

const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const isEqual = require("./is-equal")
const normal = require("./normal")
const reshape = require("./reshape")

test("tests that items can be flattened correctly", () => {
  const a = normal(100)
  expect(isEqual(flatten(a), a)).toBe(true)

  const cTrue = normal(100)
  const b = reshape(cTrue, [4, 5, 5])
  const cPred = flatten(b)
  expect(isEqual(cPred, cTrue)).toBe(true)
  expect(b.length).toBe(4)
  expect(b[0].length).toBe(5)
  expect(b[0][0].length).toBe(5)
  expect(cPred.length).toBe(100)
  expect(cPred.every(v => typeof v === "number")).toBe(true)

  const e = new Series(normal(100))
  expect(isEqual(flatten(e), flatten(e.values))).toBe(true)

  const f = new DataFrame(normal([100, 5]))
  expect(isEqual(flatten(f), flatten(f.values))).toBe(true)

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
    expect(() => flatten(item)).toThrow()
  })
})

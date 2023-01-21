const { DataFrame, Series } = require("./dataframe")
const cos = require("./cos")
const isEqual = require("./is-equal")
const normal = require("./normal")

test("tests that cosines can be computed correctly", () => {
  const r = normal([50, 50])
  const s = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [-1, Math.cos(-1)],
    [-0.5, Math.cos(-0.5)],
    [0, Math.cos(0)],
    [0.5, Math.cos(0.5)],
    [1, Math.cos(1)],
    [r, r.map(row => row.map(v => Math.cos(v)))],
    [s, s.copy().apply(v => Math.cos(v))],
    [d, d.copy().apply(col => col.apply(v => Math.cos(v)))],
  ]

  rights.forEach(pair => {
    expect(isEqual(cos(pair[0]), pair[1])).toBe(true)
  })

  const wrongs = [
    [Infinity, NaN],
    [-Infinity, NaN],
    [NaN, NaN],
    ["foo", NaN],
    [true, NaN],
    [false, NaN],
    [null, NaN],
    [undefined, NaN],
    [Symbol.for("Hello, world!"), NaN],
    [x => x, NaN],
    [
      [2, "3", 4],
      [Math.cos(2), NaN, Math.cos(4)],
    ],
    [
      function (x) {
        return x
      },
      NaN,
    ],
    [{ hello: "world" }, NaN],
  ]

  wrongs.forEach(pair => {
    expect(isEqual(cos(pair[0]), pair[1])).toBe(true)
  })
})

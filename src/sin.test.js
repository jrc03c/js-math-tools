const { DataFrame, Series } = require("./dataframe")
const isEqual = require("./is-equal")
const normal = require("./normal")
const sin = require("./sin")

test("tests that sines can be computed correctly", () => {
  const r = normal([50, 50])
  const s = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [-1, Math.sin(-1)],
    [-0.5, Math.sin(-0.5)],
    [0, Math.sin(0)],
    [0.5, Math.sin(0.5)],
    [1, Math.sin(1)],
    [r, r.map(row => row.map(v => Math.sin(v)))],
    [s, s.copy().apply(v => Math.sin(v))],
    [d, d.copy().apply(col => col.apply(v => Math.sin(v)))],
  ]

  rights.forEach(pair => {
    expect(isEqual(sin(pair[0]), pair[1])).toBe(true)
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
      [Math.sin(2), NaN, Math.sin(4)],
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
    expect(isEqual(sin(pair[0]), pair[1])).toBe(true)
  })
})

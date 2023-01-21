const { DataFrame, Series } = require("./dataframe")
const arctan = require("./arctan")
const isEqual = require("./is-equal")
const normal = require("./normal")

test("tests that the inverse sine can be computed correctly", () => {
  const r = normal([2, 3])
  const s = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [-1, Math.atan(-1)],
    [-0.5, Math.atan(-0.5)],
    [0, Math.atan(0)],
    [0.5, Math.atan(0.5)],
    [1, Math.atan(1)],
    [2.3, Math.atan(2.3)],
    [-2.3, Math.atan(-2.3)],
    [Infinity, Math.atan(Infinity)],
    [-Infinity, Math.atan(-Infinity)],
    [
      [2, 3, 4],
      [Math.atan(2), Math.atan(3), Math.atan(4)],
    ],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      [
        [Math.atan(2), Math.atan(3), Math.atan(4)],
        [Math.atan(5), Math.atan(6), Math.atan(7)],
      ],
    ],

    [r, r.map(row => row.map(v => Math.atan(v)))],
    [s, s.copy().apply(v => Math.atan(v))],
    [d, d.copy().apply(col => col.apply(v => Math.atan(v)))],
  ]

  rights.forEach(pair => {
    expect(isEqual(arctan(pair[0]), pair[1])).toBe(true)
  })

  const wrongs = [
    [NaN, NaN],
    ["foo", NaN],
    [true, NaN],
    [false, NaN],
    [null, NaN],
    [undefined, NaN],
    [Symbol.for("Hello, world!"), NaN],

    [x => x, NaN],
    [
      function (x) {
        return x
      },
      NaN,
    ],
    [{ hello: "world" }, NaN],
  ]

  wrongs.forEach(pair => {
    expect(isEqual(arctan(pair[0]), pair[1])).toBe(true)
  })
})

const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random")
const arcsin = require("./arcsin")
const isEqual = require("./is-equal")
const normal = require("./normal")

test("tests that the inverse sine can be computed correctly", () => {
  const r = random([2, 3])
  const s = new Series({ hello: random(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [-1, Math.asin(-1)],
    [-0.5, Math.asin(-0.5)],
    [0, Math.asin(0)],
    [0.5, Math.asin(0.5)],
    [1, Math.asin(1)],
    [r, r.map(row => row.map(v => Math.asin(v)))],
    [s, s.copy().apply(v => Math.asin(v))],
    [d, d.copy().apply(col => col.apply(v => Math.asin(v)))],
  ]

  rights.forEach(pair => {
    expect(isEqual(arcsin(pair[0]), pair[1])).toBe(true)
  })

  const wrongs = [
    [2.3, NaN],
    [-2.3, NaN],
    [Infinity, NaN],
    [-Infinity, NaN],
    [NaN, NaN],
    ["foo", NaN],
    [true, NaN],
    [false, NaN],
    [null, NaN],
    [undefined, NaN],
    [Symbol.for("Hello, world!"), NaN],
    [
      [2, 3, 4],
      [NaN, NaN, NaN],
    ],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      [
        [NaN, NaN, NaN],
        [NaN, NaN, NaN],
      ],
    ],
    [random(100).map(v => v * 100 + 100), random(100).map(() => NaN)],
    [x => x, NaN],
    [
      function (x) {
        return x
      },
      NaN,
    ],
    [{ hello: "world" }, NaN],
    [
      new Series({ hello: [10, 20, 30, 40, 50] }),
      new Series({ hello: [NaN, NaN, NaN, NaN, NaN] }),
    ],
    [
      new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
      new DataFrame({
        foo: [Math.PI / 2, NaN, NaN, NaN, NaN],
        bar: [Math.PI / 2, NaN, NaN, NaN, NaN],
      }),
    ],
  ]

  wrongs.forEach(pair => {
    expect(isEqual(arcsin(pair[0]), pair[1])).toBe(true)
  })
})

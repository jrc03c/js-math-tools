const { DataFrame, Series } = require("./dataframe")
const abs = require("./abs")
const add = require("./add")
const covariance = require("./covariance")
const normal = require("./normal")
const scale = require("./scale")

test("tests that covariances can be computed correctly", () => {
  const a = [2, 3, 4]
  const b = [1, 1, 1]
  expect(covariance(a, b)).toBe(0)

  const c = normal(10000)
  const d = normal(10000)
  expect(abs(covariance(c, d))).toBeLessThan(0.15)

  const e = normal(10000)
  expect(covariance(e, e)).toBeGreaterThan(0.85)

  expect(covariance([], [])).toBeNaN()

  const h = normal(1000)
  const i = add(h, scale(1e-10, normal(1000)))
  expect(covariance(h, h)).toBeGreaterThan(0.85)
  expect(covariance(h, i)).toBeGreaterThan(0.85)

  const j = add(h, scale(0.1, normal(1000)))
  expect(covariance(h, j)).toBeGreaterThan(0.75)

  const k = normal(1000)
  expect(covariance(h, k)).toBeGreaterThan(-0.25)
  expect(covariance(h, k)).toBeLessThan(0.25)

  const l = new Series(h)
  const m = new Series(i)
  expect(covariance(l, m)).toBeGreaterThan(0.85)

  expect(covariance([2, 3, 4], ["five", "six", "seven"])).toBeNaN()

  const wrongs = [
    [0, 1],
    [Infinity, NaN],
    ["foo", true],
    [false, null],
    [undefined, Symbol.for("Hello, world!")],
    [
      x => x,
      function (x) {
        return x
      },
    ],
    [{ hello: "world" }, { goodbye: "world" }],
    [normal(100), normal(200)],
    [new Series(normal(100)), new Series(normal(101))],
    [new DataFrame(normal([100, 2])), new DataFrame(normal([100, 2]))],
  ]

  wrongs.forEach(pair => {
    expect(() => covariance(pair[0], pair[1])).toThrow()
  })
})

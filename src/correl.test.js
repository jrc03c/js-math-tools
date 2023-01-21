const { DataFrame, Series } = require("./dataframe")
const add = require("./add")
const correl = require("./correl")
const normal = require("./normal")
const scale = require("./scale")

test("tests that correlations can be computed correctly", () => {
  const a = normal(1000)
  const b = add(a, scale(0.0001, normal(1000)))
  expect(correl(a, a)).toBeCloseTo(1)
  expect(correl(a, b)).toBeGreaterThan(0.99)

  const c = add(a, scale(0.1, normal(1000)))
  expect(correl(a, c)).toBeGreaterThan(0.75)

  const d = normal(1000)
  expect(correl(a, d)).toBeGreaterThan(-0.25)
  expect(correl(a, d)).toBeLessThan(0.25)

  const e = new Series(a)
  const f = new Series(b)
  expect(correl(e, f)).toBeGreaterThan(0.99)

  expect(correl([2, 3, 4], ["five", "six", "seven"])).toBeNaN()

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
    expect(() => correl(pair[0], pair[1])).toThrow()
  })
})

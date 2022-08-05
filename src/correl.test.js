const abs = require("./abs.js")
const add = require("./add.js")
const correl = require("./correl.js")
const normal = require("./normal.js")
const scale = require("./scale.js")

test("gets the correlation of completely unrelated vectors", () => {
  const x = normal([10000])
  const y = normal([10000])
  const r = correl(x, y)
  expect(abs(r)).toBeLessThan(0.05)
})

test("gets the correlation of positively correlated vectors", () => {
  const x = normal([10000])
  const y = add(x, scale(0.01, normal([10000])))
  const r = correl(x, y)
  expect(r).toBeGreaterThan(0.95)
})

test("gets the correlation of negatively correlated vectors", () => {
  const x = normal([10000])
  const y = add(scale(-1, x), scale(0.01, normal([10000])))
  const r = correl(x, y)
  expect(r).toBeLessThan(-0.95)
})

test("returns NaN when `correl` is called without arguments", () => {
  expect(correl()).toBeNaN()
})

test("returns NaN when `correl` is called on empty arrays", () => {
  expect(correl([], [])).toBeNaN()
})

test("returns NaN when `correl` is called on arrays containing only non-numerical values", () => {
  expect(correl(["foo", "bar"], ["baz", "blah"])).toBeNaN()
})

test("gets the correlation of vectors that have missing values", () => {
  const x = normal([10000])
  const y = normal([10000])

  for (let i = 0; i < 100; i++) {
    x[parseInt(Math.random() * x.length)] = null
    y[parseInt(Math.random() * y.length)] = null
  }

  expect(correl(x, y)).toBeNaN()
})

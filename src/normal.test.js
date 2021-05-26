const normal = require("./normal.js")
const std = require("./std.js")
const mean = require("./mean.js")
const abs = require("./abs.js")
const seed = require("./seed.js")
const distance = require("./distance.js")

test("generates a vector of normally-distributed random numbers", () => {
  const x = normal([10000])
  const m = mean(x)
  const s = std(x)

  expect(abs(m)).toBeLessThan(0.05)
  expect(abs(s - 1)).toBeLessThan(0.05)
})

test("generates a tensor of normally-distributed random numbers", () => {
  const x = normal([10, 10, 10, 10])
  const m = mean(x)
  const s = std(x)

  expect(abs(m)).toBeLessThan(0.05)
  expect(abs(s - 1)).toBeLessThan(0.05)
})

test("generates the same normally-distributed random numbers using the same seed", () => {
  seed(230498230498)
  const a = normal(10000)
  seed(230498230498)
  const b = normal(10000)
  expect(a).toStrictEqual(b)
})

test("throws an error when attempting to get normally-distributed random numbers with non-whole-number arguments", () => {
  expect(() => {
    normal(-1)
  }).toThrow()

  expect(() => {
    normal([-2, -3, -4])
  }).toThrow()

  expect(() => {
    normal({})
  }).toThrow()

  expect(() => {
    normal(true)
  }).toThrow()

  expect(() => {
    normal(false)
  }).toThrow()

  expect(() => {
    normal(null)
  }).not.toThrow()

  expect(() => {
    normal(undefined)
  }).not.toThrow()

  expect(() => {
    normal(() => {})
  }).toThrow()
})

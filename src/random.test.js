const abs = require("./abs.js")
const mean = require("./mean.js")
const std = require("./std.js")
const { random, seed } = require("./random.js")

test("generates a vector of random numbers", () => {
  const x = random([10000])
  const m = mean(x)
  const s = std(x)

  expect(abs(m - 0.5)).toBeLessThan(0.05)
  expect(abs(s - 0.25)).toBeLessThan(0.05)
})

test("generates a tensor of random numbers", () => {
  const x = random([10, 10, 10, 10])
  const m = mean(x)
  const s = std(x)

  expect(abs(m - 0.5)).toBeLessThan(0.05)
  expect(abs(s - 0.25)).toBeLessThan(0.05)
})

test("generates the same random numbers using the same seed", () => {
  seed(230498230498)
  const a = random(10000)
  seed(230498230498)
  const b = random(10000)
  expect(a).toStrictEqual(b)
})

test("throws an error when attempting to get random numbers with non-whole-number arguments", () => {
  expect(() => {
    random(-1)
  }).toThrow()

  expect(() => {
    random([-2, -3, -4])
  }).toThrow()

  expect(() => {
    random({})
  }).toThrow()

  expect(() => {
    random(true)
  }).toThrow()

  expect(() => {
    random(false)
  }).toThrow()

  expect(() => {
    random(null)
  }).not.toThrow()

  expect(() => {
    random(undefined)
  }).not.toThrow()

  expect(() => {
    random(() => {})
  }).toThrow()
})

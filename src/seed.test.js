const isEqual = require("./is-equal.js")
const { random, seed } = require("./random.js")

test("seeds the pseudo-random number generator", () => {
  const s1 = seed()
  const s2 = seed()
  expect(isEqual(s1, s2)).toBe(true)

  const s3 = seed()
  random()
  const s4 = seed()
  expect(isEqual(s3, s4)).toBe(false)

  seed(13579)
  const a = random(1000)
  seed(13579)
  const b = random(1000)
  expect(isEqual(a, b)).toBe(true)

  const c = random(1000)
  const d = random(1000)
  expect(isEqual(c, d)).toBe(false)
})

test("throws an error when attempting to seed the PRNG with non-whole-numbers", () => {
  expect(() => {
    seed("foo")
  }).toThrow()

  expect(() => {
    seed(true)
  }).toThrow()

  expect(() => {
    seed(false)
  }).toThrow()

  expect(() => {
    seed(() => {})
  }).toThrow()

  expect(() => {
    seed({})
  }).toThrow()

  expect(() => {
    seed(null)
  }).not.toThrow()

  expect(() => {
    seed(undefined)
  }).not.toThrow()
})

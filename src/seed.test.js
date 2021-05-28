const seed = require("./seed.js")
const random = require("./random.js")

test("seeds the pseudo-random number generator", () => {
  const s1 = seed()
  const s2 = seed()
  expect(s1).toBe(s2)

  const s3 = seed()
  random()
  const s4 = seed()
  expect(s3).not.toBe(s4)

  seed(13579)
  const a = random(1000)
  seed(13579)
  const b = random(1000)
  expect(a).toStrictEqual(b)

  const c = random(1000)
  const d = random(1000)
  expect(c).not.toStrictEqual(d)
})

test("throws an error when attempting to seed the PRNG with non-whole-numbers", () => {
  expect(() => {
    seed(-1)
  }).toThrow()

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

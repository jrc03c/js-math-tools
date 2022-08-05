const normal = require("./normal.js")
const seed = require("./random.js").seed
const shuffle = require("./shuffle.js")

test("shuffles a vector", () => {
  const a = normal(10000)
  const b = shuffle(a)
  expect(a).not.toStrictEqual(b)
})

test("shuffles a vector twice with the same seed to produce the same results", () => {
  const c = normal(10000)
  seed(20394230948)
  const c1 = shuffle(c)
  seed(20394230948)
  const c2 = shuffle(c)
  expect(c1).toStrictEqual(c2)
})

test("shuffles a tensor and an empty array without failing", () => {
  expect(() => {
    shuffle(normal([2, 3, 4, 5]))
  }).not.toThrow()

  expect(() => {
    shuffle([])
  }).not.toThrow()
})

test("throws an error when attempting to shuffle non-arrays", () => {
  expect(() => {
    shuffle()
  }).toThrow()

  expect(() => {
    shuffle("foo")
  }).toThrow()

  expect(() => {
    shuffle(true)
  }).toThrow()

  expect(() => {
    shuffle(false)
  }).toThrow()

  expect(() => {
    shuffle(() => {})
  }).toThrow()

  expect(() => {
    shuffle({})
  }).toThrow()

  expect(() => {
    shuffle(null)
  }).toThrow()

  expect(() => {
    shuffle(undefined)
  }).toThrow()

  expect(() => {
    shuffle(234)
  }).toThrow()
})

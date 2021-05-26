const log = require("./log.js")
const abs = require("./abs.js")
const distance = require("./distance.js")

test("takes the log of E using base E to get 1", () => {
  const x = Math.E
  const base = Math.E
  const yTrue = 1
  const yPred = log(x, base)
  expect(yPred).toBe(yTrue)
})

test("takes the log of 10 with base 10 to get 1", () => {
  const x = 10
  const base = 10
  const yTrue = 1
  const yPred = log(x, base)
  expect(yPred).toBe(yTrue)
})

test("takes the log of 100 with base 10 to get 2", () => {
  const x = 100
  const base = 10
  const yTrue = 2
  const yPred = log(x, base)
  expect(yPred).toBe(yTrue)
})

test("takes the log of an array of values using a common base", () => {
  const x = [100, 1000, 10000]
  const base = 10
  const yTrue = [2, 3, 4]
  const yPred = log(x, base)
  expect(distance(yPred, yTrue)).toBeLessThan(1e-5)
})

test("takes the log of a value using an array of bases", () => {
  const x = 64
  const base = [2, 4, 8]
  const yTrue = [6, 3, 2]
  const yPred = log(x, base)
  expect(distance(yPred, yTrue)).toBeLessThan(1e-5)
})

test("returns NaN when taking the log of non-numerical values", () => {
  expect(log()).toBeNaN()
  expect(log(-5)).toBeNaN()
  expect(log("foo", 10)).toBeNaN()
  expect(log(10, "foo")).toBeNaN()
  expect(log(true, false)).toBeNaN()
  expect(log(() => {})).toBeNaN()
  expect(log({})).toBeNaN()
  expect(log([])).toStrictEqual([])
})

test("throws an error when attempting to take the log of arrays of different shapes", () => {
  expect(() => {
    const x = range(0, 100)
    const base = normal(200)
    log(x, base)
  }).toThrow()
})

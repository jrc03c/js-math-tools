const inverse = require("./inverse.js")
const identity = require("./identity.js")
const isEqual = require("./is-equal.js")
const normal = require("./normal.js")
const { random } = require("./random.js")
const distance = require("./distance.js")
const round = require("./round.js")
const zeros = require("./zeros.js")
const dot = require("./dot.js")
const add = require("./add.js")
const scale = require("./scale.js")

test("gets the inverse of a matrix", () => {
  const x = normal([10, 10])
  const xinv = inverse(x)
  expect(distance(identity(10), dot(x, xinv))).toBeLessThan(1e-5)
})

test("gets the inverse of another matrix", () => {
  const x = random([20, 20])
  const xinv = inverse(x)
  expect(distance(identity(20), dot(x, xinv))).toBeLessThan(1e-5)
})

test("gets the inverse of a third matrix", () => {
  const x = round(add(scale(normal([10, 10]), 10), 20))
  const xinv = inverse(x)
  expect(distance(identity(10), dot(x, xinv))).toBeLessThan(1e-5)
})

test("gets the inverse of an identity matrix", () => {
  const x = identity(10)
  const xinv = inverse(x)
  expect(distance(identity(10), dot(x, xinv))).toBeLessThan(1e-5)
})

test("throws an error when attempting to get the inverse of a non-square matrix and/or a tensor", () => {
  expect(() => {
    inverse(normal([10, 10, 10]))
  }).toThrow()

  expect(() => {
    inverse(zeros([10, 10]))
  }).toThrow()

  expect(() => {
    inverse(normal([10, 20]))
  }).toThrow()
})

test("throws an error when attempting to get the inverse of non-numericals and/or non-matrices", () => {
  expect(() => {
    inverse()
  }).toThrow()

  expect(() => {
    inverse(234)
  }).toThrow()

  expect(() => {
    inverse("foo")
  }).toThrow()

  expect(() => {
    inverse(true)
  }).toThrow()

  expect(() => {
    inverse(() => {})
  }).toThrow()

  expect(() => {
    inverse({})
  }).toThrow()

  expect(() => {
    inverse([])
  }).toThrow()

  expect(() => {
    const x = normal([10, 10])
    x[0][0] = "foo"
    inverse(x)
  }).toThrow()
})

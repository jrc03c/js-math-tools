const identity = require("./identity")
const set = require("./set")
const sort = require("./sort")

function isIdentity(x) {
  for (let i = 0; i < x.length; i++) {
    const row = x[i]

    for (let j = 0; j < row.length; j++) {
      if (i === j) {
        if (x[i][j] !== 1) return false
      } else {
        if (x[i][j] !== 0) return false
      }
    }
  }

  return true
}

test("creates an identity matrix", () => {
  const x = identity(100)
  expect(isIdentity(x)).toBe(true)
  expect(sort(set(x))).toStrictEqual([0, 1])
})

test("throws an error when attempting to create an identity matrix with a non-whole-number size", () => {
  expect(() => {
    identity()
  }).toThrow()

  expect(() => {
    identity(-5)
  }).toThrow()

  expect(() => {
    identity("foo")
  }).toThrow()

  expect(() => {
    identity(true)
  }).toThrow()

  expect(() => {
    identity([2, 3, 4])
  }).toThrow()

  expect(() => {
    identity({})
  }).toThrow()

  expect(() => {
    identity(() => {})
  }).toThrow()
})

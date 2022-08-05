const isEqual = require("./is-equal.js")
const normal = require("./normal.js")
const range = require("./range.js")
const shuffle = require("./shuffle.js")
const sort = require("./sort.js")

test("sorts a set of numbers", () => {
  const x = shuffle(range(1, 7))
  const yTrue = range(1, 7)
  const yPred = sort(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("sorts an array of objects", () => {
  const x = [{ x: 5 }, { x: 3 }, { x: 10 }]
  const yTrue = [{ x: 10 }, { x: 5 }, { x: 3 }]

  const yPred = sort(x, (a, b) => {
    if (a.x < b.x) return 1
    if (a.x > b.x) return -1
    return 0
  })

  expect(isEqual(yPred, yTrue)).toBe(true)
})

test("sorts an array of numbers", () => {
  const x = normal(10000)
  const yPred = sort(x)

  for (let i = 0; i < yPred.length - 1; i++) {
    expect(yPred[i]).toBeLessThanOrEqual(yPred[i + 1])
  }
})

test("sorts an array of letters", () => {
  const x = ["b", "c", "a", "d", "f", "e"]
  const yTrue = ["a", "b", "c", "d", "e", "f"]
  const yPred = sort(x)
  expect(yPred).toStrictEqual(yTrue)
})

test("sorts a weirdly-shaped, nested array", () => {
  const x = []

  for (let i = 0; i < 5; i++) {
    x.push(range(0, i + 1))
  }

  const yPred = sort(x, (a, b) => b.length - a.length)

  for (let i = 0; i < yPred.length - 1; i++) {
    expect(yPred[i].length).toBeGreaterThanOrEqual(yPred[i + 1].length)
  }
})

test("throws an error when attempting to sort non-arrays with non-functions", () => {
  expect(() => {
    sort()
  }).toThrow()

  expect(() => {
    sort([2, 3, 4], "foo")
  }).toThrow()

  expect(() => {
    sort("foo")
  }).toThrow()

  expect(() => {
    sort(true)
  }).toThrow()

  expect(() => {
    sort(false)
  }).toThrow()

  expect(() => {
    sort(null)
  }).toThrow()

  expect(() => {
    sort(undefined)
  }).toThrow()

  expect(() => {
    sort(() => {})
  }).toThrow()

  expect(() => {
    sort({})
  }).toThrow()
})

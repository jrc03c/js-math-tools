const isEqual = require("./is-equal.js")
const isUndefined = require("./is-undefined.js")
const normal = require("./normal.js")
const shape = require("./shape.js")

test("gets the shape of some non-jagged arrays", () => {
  expect(shape(normal(500))).toStrictEqual([500])
  expect(shape(normal([2, 3, 4]))).toStrictEqual([2, 3, 4])
})

test("gets the shape of some jagged arrays", () => {
  const x = [2, [3, 4], 5]
  const yTrue = [3, [undefined, 2, undefined]]
  const yPred = shape(x)
  expect(isEqual(yPred, yTrue)).toBe(true)

  const x2 = normal([5, 5])
  x2[0].splice(0, 1)
  const yTrue2 = [5, [4, 5, 5, 5, 5]]
  const yPred2 = shape(x2)
  expect(isEqual(yPred2, yTrue2)).toBe(true)
})

test("returns an undefined shape for non-arrays", () => {
  const others = [234, "foo", true, false, null, undefined, () => {}, {}]

  others.forEach(x => {
    expect(isUndefined(shape(x))).toBe(true)
  })
})

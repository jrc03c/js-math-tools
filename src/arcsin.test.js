const arcsin = require("./arcsin.js")
const random = require("./random.js")

test("takes arcsin of 0", () => {
  const x = 0
  const yTrue = 0
  const yPred = arcsin(x)
  expect(yPred).toBe(yTrue)
})

test("takes arcsin of 1", () => {
  const x = 1
  const yTrue = Math.PI / 2
  const yPred = arcsin(x)
  expect(yPred).toBe(yTrue)
})

test("returns NaN when `arcsin` is called with no arguments", () => {
  expect(arcsin()).toBeNaN()
})

test("returns NaN when `arcsin` is passed a value outside the range -1 to 1", () => {
  expect(arcsin(-2)).toBeNaN()
  expect(arcsin(2)).toBeNaN()
})

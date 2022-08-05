const arccos = require("./arccos.js")

test("takes arccos of 0", () => {
  const x = 0
  const yTrue = Math.PI / 2
  const yPred = arccos(x)
  expect(yPred).toBe(yTrue)
})

test("takes arccos of 1", () => {
  const x = 1
  const yTrue = 0
  const yPred = arccos(x)
  expect(yPred).toBe(yTrue)
})

test("returns NaN when `arccos` is called with no arguments", () => {
  expect(arccos()).toBeNaN()
})

test("returns NaN when `arccos` is passed a value outside the range -1 to 1", () => {
  expect(arccos(-2)).toBeNaN()
  expect(arccos(2)).toBeNaN()
})

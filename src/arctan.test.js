const arctan = require("./arctan.js")

test("takes arctan of 0", () => {
  const x = 0
  const yTrue = 0
  const yPred = arctan(x)
  expect(yPred).toBe(yTrue)
})

test("takes arctan of 1", () => {
  const x = 1
  const yTrue = Math.PI / 4
  const yPred = arctan(x)
  expect(yPred).toBe(yTrue)
})

test("takes arctan of Infinity", () => {
  const yTrue = Math.PI / 2
  const yPred = arctan(Infinity)
  expect(yPred).toBe(yTrue)
})

test("returns NaN when `arctan` is called with no arguments", () => {
  expect(arctan()).toBeNaN()
})

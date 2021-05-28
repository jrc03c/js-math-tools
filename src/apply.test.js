const apply = require("./apply.js")
const normal = require("./normal.js")
const scale = require("./scale.js")

test("applies a function to a vector", () => {
  const yTrue = [2, 4, 6]
  const yPred = apply([1, 2, 3], v => 2 * v)
  expect(yPred).toStrictEqual(yTrue)
})

test("applies a function to a tensor", () => {
  const x = normal([5, 5, 5, 5, 5])
  const yTrue = scale(x, 2)
  const yPred = apply(x, v => 2 * v)
  expect(yPred).toStrictEqual(yTrue)
})

test("applies an array of functions to an array of values", () => {
  const double = x => x * 2
  const triple = x => x * 3
  const quadruple = x => x * 4
  const yPred = apply([1, 2, 3], [double, triple, quadruple])
  const yTrue = [2, 6, 12]
  expect(yPred).toStrictEqual(yTrue)
})

test("returns NaN when `apply` is called with no arguments", () => {
  expect(apply()).toBeNaN()
})

test("returns NaN when `x` is not an array", () => {
  expect(apply("foobar", v => v * 2)).toBeNaN()
})

test("returns an array of NaNs when `fn` is not a function", () => {
  const yPred = apply([2, 3, 4], "foobar")
  yPred.forEach(v => expect(v).toBeNaN())
})

test("throws an error when attempting to apply an array of functions to an array of values with a different shape", () => {
  expect(() => {
    const double = x => x * 2
    const triple = x => x * 3
    const quadruple = x => x * 4
    const quintuple = x => x * 5

    apply([2, 3, 4], [double, triple, quadruple, quintuple])
  }).toThrow()
})

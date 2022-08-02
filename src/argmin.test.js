const argmin = require("./argmin.js")
const shuffle = require("./shuffle.js")
const range = require("./range.js")

test("gets the argmin of a linear range of values", () => {
  const x = shuffle(range(0, 100))
  const indexTrue = x.indexOf(0)
  const indexPred = argmin(x)
  expect(indexPred).toStrictEqual(indexTrue)
})

test("gets the argmin of a predefined array of values", () => {
  const x = [
    [2, 3, 4],
    [0, 1, 2],
    [-5, 10, 20],
  ]

  const indexTrue = [2, 0]
  const indexPred = argmin(x)
  expect(indexPred).toStrictEqual(indexTrue)
})

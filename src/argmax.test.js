const argmax = require("./argmax.js")
const shuffle = require("./shuffle.js")
const range = require("./range.js")

test("gets the argmax of a linear range of values", () => {
  const x = shuffle(range(0, 100))
  const indexTrue = x.indexOf(99)
  const indexPred = argmax(x)[0]
  expect(indexPred).toStrictEqual(indexTrue)
})

test("gets the argmax of a predefined array of values", () => {
  const x = [
    [2, 3, 4],
    [0, 1, 2],
    [-5, 10, 20],
  ]

  const indexTrue = [2, 2]
  const indexPred = argmax(x)
  expect(indexPred).toStrictEqual(indexTrue)
})

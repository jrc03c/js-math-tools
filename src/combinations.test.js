const combinations = require("./combinations")
const factorial = require("./factorial")
const range = require("./range")
const set = require("./set")
const sort = require("./sort")

function turnIntoStrings(arr) {
  return arr.map(item => JSON.stringify(item))
}

function getNumberOfCombinations(arr, r) {
  const n = arr.length
  return factorial(n) / (factorial(r) * factorial(n - r))
}

test("", () => {
  const aTrue = sort(
    set(
      turnIntoStrings([
        [0, 1, 2],
        [0, 1, 3],
        [0, 1, 4],
        [0, 2, 3],
        [0, 2, 4],
        [0, 3, 4],
        [1, 2, 3],
        [1, 2, 4],
        [1, 3, 4],
        [2, 3, 4],
      ])
    )
  )

  const aPred = sort(set(turnIntoStrings(combinations(range(0, 5), 3))))
  expect(aPred).toStrictEqual(aTrue)

  const x = range(0, 10)
  const r = 3
  expect(combinations(x, r).length).toBe(getNumberOfCombinations(x, r))

  expect(combinations(range(0, 10), -1)).toStrictEqual([[]])
  expect(combinations(range(0, 10), 100)).toStrictEqual([range(0, 10)])
})

test("", () => {
  const failures = [
    [[1, 2, 3, 4, 5], 3.5],
    [[1, 2, 3, 4, 5], "3"],
    ["foo", 3],
    [234, 3],
    [true, 3],
    [false, 3],
    [null, 3],
    [undefined, 3],
    [{}, 3],
    [() => {}, 3],
  ]

  failures.forEach(f => {
    expect(() => {
      combinations(f[0], f[1])
    }).toThrow()
  })
})

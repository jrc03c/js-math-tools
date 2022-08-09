const factorial = require("./factorial.js")
const isEqual = require("./is-equal.js")
const permutations = require("./permutations.js")
const range = require("./range.js")
const set = require("./set.js")
const sort = require("./sort.js")

function turnIntoStrings(arr) {
  return arr.map(item => JSON.stringify(item))
}

function getNumberOfPermutations(arr, r) {
  const n = arr.length
  return factorial(n) / factorial(n - r)
}

test("tests that permutations can be correctly computed", () => {
  const a = [2, 3, 4]

  const bTrue = sort(
    set(
      turnIntoStrings([
        [2, 3, 4],
        [2, 4, 3],
        [3, 2, 4],
        [3, 4, 2],
        [4, 2, 3],
        [4, 3, 2],
      ])
    )
  )

  const bPred = sort(set(turnIntoStrings(permutations(a))))
  expect(bPred).toStrictEqual(bTrue)

  const c = ["a", "b", "c", "d"]

  const dTrue = sort(
    set(
      turnIntoStrings([
        ["a", "b", "c", "d"],
        ["a", "b", "d", "c"],
        ["a", "c", "b", "d"],
        ["a", "c", "d", "b"],
        ["a", "d", "b", "c"],
        ["a", "d", "c", "b"],
        ["b", "a", "c", "d"],
        ["b", "a", "d", "c"],
        ["b", "c", "a", "d"],
        ["b", "c", "d", "a"],
        ["b", "d", "a", "c"],
        ["b", "d", "c", "a"],
        ["c", "a", "b", "d"],
        ["c", "a", "d", "b"],
        ["c", "b", "a", "d"],
        ["c", "b", "d", "a"],
        ["c", "d", "a", "b"],
        ["c", "d", "b", "a"],
        ["d", "a", "b", "c"],
        ["d", "a", "c", "b"],
        ["d", "b", "a", "c"],
        ["d", "b", "c", "a"],
        ["d", "c", "a", "b"],
        ["d", "c", "b", "a"],
      ])
    )
  )

  const dPred = sort(set(turnIntoStrings(permutations(c))))
  expect(dPred).toStrictEqual(dTrue)

  for (let i = 2; i < 10; i++) {
    const e = range(0, i)
    expect(permutations(e).length).toBe(factorial(i))
  }

  for (let i = 1; i < 8; i++) {
    const e = range(0, 8)
    expect(permutations(e, i).length).toBe(getNumberOfPermutations(e, i))
  }

  function trioSort(a, b) {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return a[2] - b[2]
      } else {
        return a[1] - b[1]
      }
    } else {
      return a[0] - b[0]
    }
  }

  const f = [2, [3, 4, [5]]]
  const gPred = sort(permutations(f, 3), trioSort)

  const gTrue = sort(
    [
      [2, 3, 4],
      [2, 3, 5],
      [2, 4, 3],
      [2, 4, 5],
      [2, 5, 3],
      [2, 5, 4],
      [3, 2, 4],
      [3, 2, 5],
      [3, 4, 2],
      [3, 4, 5],
      [3, 5, 2],
      [3, 5, 4],
      [4, 2, 3],
      [4, 2, 5],
      [4, 3, 2],
      [4, 3, 5],
      [4, 5, 2],
      [4, 5, 3],
      [5, 2, 3],
      [5, 2, 4],
      [5, 3, 2],
      [5, 3, 4],
      [5, 4, 2],
      [5, 4, 3],
    ],
    trioSort
  )

  expect(isEqual(gPred, gTrue)).toBe(true)
})

test("tests that errors are thrown when trying to get permutations from non-arrays", () => {
  const failures = [true, false, null, undefined, 234, "foo", () => {}, {}]

  failures.forEach(f => {
    expect(() => {
      permutations(f)
    }).toThrow()
  })
})

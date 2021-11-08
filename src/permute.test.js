const permute = require("./permute.js")
const sort = require("./sort.js")
const set = require("./set.js")
const range = require("./range.js")
const int = require("./int.js")
const factorial = require("./factorial.js")

function turnIntoStrings(arr) {
  return arr.map(item => JSON.stringify(item))
}

test("", () => {
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

  const bPred = sort(set(turnIntoStrings(permute(a))))
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

  const dPred = sort(set(turnIntoStrings(permute(c))))
  expect(dPred).toStrictEqual(dTrue)

  for (let i = 2; i < 10; i++) {
    const e = range(0, i)
    expect(permute(e).length).toBe(factorial(i))
  }
})

test("", () => {
  const failures = [
    [
      [2, 3],
      [4, 5],
      [6, 7],
    ],
    true,
    false,
    null,
    undefined,
    234,
    "foo",
    () => {},
    {},
  ]

  failures.forEach(f => {
    expect(() => {
      permute(f)
    }).toThrow()
  })
})

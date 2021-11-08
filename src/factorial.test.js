const factorial = require("./factorial.js")

test("tests that the `factorial` function works as expected", () => {
  const pairs = [
    [-2, 1],
    [0, 1],
    [1, 1],
    [2, 2],
    [3, 6],
    [4, 24],
    [5, 120],
  ]

  pairs.forEach(pair => {
    expect(factorial(pair[0])).toBe(pair[1])
  })

  expect(factorial([2, 3, 4, 5])).toStrictEqual([2, 6, 24, 120])

  const failures = [
    "foo",
    true,
    false,
    null,
    undefined,
    {},
    () => {},
    -1.5,
    5.75,
  ]

  failures.forEach(f => {
    expect(factorial(f)).toBeNaN()
  })
})

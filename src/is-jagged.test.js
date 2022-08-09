const isJagged = require("./is-jagged.js")
const normal = require("./normal.js")

test("tests that jagged arrays can be identified correctly", () => {
  const x = normal([2, 3, 4, 5])

  expect(isJagged([])).toBe(false)
  expect(isJagged([2, 3, 4])).toBe(false)
  expect(isJagged(x)).toBe(false)
  expect(isJagged([[[[[]]]]])).toBe(false)

  expect(
    isJagged([2, "three", true, false, null, undefined, () => {}, {}])
  ).toBe(false)

  x[0][0][0].splice(0, 1)

  expect(isJagged([2, [3, 4, [5, 6, 7]]])).toBe(true)
  expect(isJagged([[2], [3, 4], [5, 6, 7]])).toBe(true)
  expect(isJagged(x)).toBe(true)

  const others = [234, "foo", true, false, null, undefined, () => {}, {}]

  others.forEach(x => {
    expect(isJagged(x)).toBe(false)
  })
})

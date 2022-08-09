const isNested = require("./is-nested.js")
const normal = require("./normal.js")

test("tests that nested arrays can be identified correctly", () => {
  expect(isNested([])).toBe(false)
  expect(isNested([2, 3, 4])).toBe(false)
  expect(isNested(normal(1000))).toBe(false)

  expect(isNested([[]])).toBe(true)
  expect(isNested([2, [3, 4, [5, 6, 7]]])).toBe(true)
  expect(isNested(normal([2, 3, 4, 5]))).toBe(true)

  const others = [234, "foo", true, false, null, undefined, () => {}, {}]

  others.forEach(x => {
    expect(isNested(x)).toBe(false)
  })
})

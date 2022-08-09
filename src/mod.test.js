const mod = require("./mod.js")
const normal = require("./normal.js")

test("tests that the modulo function works as expected", () => {
  expect(mod(0, 3)).toBe(0)
  expect(mod(1, 3)).toBe(1)
  expect(mod(2, 3)).toBe(2)
  expect(mod(3, 3)).toBe(0)
  expect(mod(4, 3)).toBe(1)
  expect(mod(5, 3)).toBe(2)
  expect(mod(6, 3)).toBe(0)

  const a = [2, 4, 6, 8]
  const b = [2, 2, 3, 3]
  expect(mod(a, b)).toStrictEqual([0, 0, 0, 2])
  expect(mod(a, 5)).toStrictEqual([2, 4, 1, 3])
  expect(mod(5, b)).toStrictEqual([1, 1, 2, 2])

  expect(() => mod(normal([2, 3, 4, 5]), normal([2, 3, 4, 5]))).not.toThrow()
  expect(() => mod(normal([2, 3]), normal([4, 5]))).toThrow()

  const wrongs = [
    [234, "foo"],
    ["foo", 234],
    ["foo", "bar"],
    [true, false],
    [null, undefined],
    [() => {}, {}],
  ]

  wrongs.forEach(pair => {
    expect(isNaN(mod(pair[0], pair[1]))).toBe(true)
  })
})

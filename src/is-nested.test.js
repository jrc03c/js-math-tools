const { DataFrame, Series } = require("./dataframe")
const isNested = require("./is-nested")
const normal = require("./normal")

test("tests that nested arrays can be identified correctly", () => {
  expect(isNested(normal(100))).toBe(false)
  expect(isNested(normal([10, 10]))).toBe(true)
  expect(isNested(normal([2, 3, 4, 5]))).toBe(true)
  expect(isNested(new Series(normal(100)))).toBe(false)
  expect(isNested(new DataFrame(normal([10, 10])))).toBe(true)

  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
  ]

  wrongs.forEach(item => {
    expect(() => isNested(item)).toThrow()
  })
})

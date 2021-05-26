const dropNaNPairwise = require("./drop-nan-pairwise.js")
const range = require("./range.js")

test("drops NaN values pairwise on vectors that don't actually have NaN values", () => {
  const a = [1, 2, 3, 4]
  const b = [5, 6, 7, 8]
  const [aTemp, bTemp] = dropNaNPairwise(a, b)
  expect(aTemp).toStrictEqual(a)
  expect(bTemp).toStrictEqual(b)
})

test("drops NaN values pairwise on vectors that have NaN values", () => {
  const a = [1, 2, "foo", 4]
  const b = [true, 6, 7, 8]
  const [aTemp, bTemp] = dropNaNPairwise(a, b)
  expect(aTemp).toStrictEqual([2, 4])
  expect(bTemp).toStrictEqual([6, 8])
})

test("drops NaN values pairwise on vectors that contain only NaN values", () => {
  const a = range(0, 5).map(i => "foo")
  const b = range(0, 5).map(i => "bar")
  const [aTemp, bTemp] = dropNaNPairwise(a, b)
  expect(aTemp.length).toBe(0)
  expect(bTemp.length).toBe(0)
})

test("drops NaN values pairwise on vectors of differing lengths", () => {
  const a = [1, 2, 3]
  const b = [4, 5, 6, 7, 8, 9, 10]
  const [aTemp, bTemp] = dropNaNPairwise(a, b)
  expect(aTemp).toStrictEqual([1, 2, 3])
  expect(bTemp).toStrictEqual([4, 5, 6])
})

test("throws an error when attempting to drop NaN values pairwise on non-vectors", () => {
  expect(() => {
    dropNaNPairwise()
  }).toThrow()

  expect(() => {
    dropNaNPairwise("foo", "bar")
  }).toThrow()

  expect(() => {
    dropNaNPairwise(3, 4)
  }).toThrow()

  expect(() => {
    dropNaNPairwise({}, [])
  }).toThrow()

  expect(() => {
    dropNaNPairwise(() => {}, true)
  }).toThrow()

  expect(() => {
    const a = normal([5, 10])
    const b = normal([5, 10])
    dropNaNPairwise(a, b)
  }).toThrow()
})

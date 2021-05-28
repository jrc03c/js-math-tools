const dropMissingPairwise = require("./drop-missing-pairwise.js")

test("drops missing values pairwise on vectors that don't actually have missing values", () => {
  const a = [1, 2, 3, 4]
  const b = [5, 6, 7, 8]
  const [aTemp, bTemp] = dropMissingPairwise(a, b)
  expect(aTemp).toStrictEqual(a)
  expect(bTemp).toStrictEqual(b)
})

test("drops missing values pairwise on vectors that have missing values", () => {
  const a = [1, 2, null, 4]
  const b = [undefined, 6, 7, 8]
  const [aTemp, bTemp] = dropMissingPairwise(a, b)
  expect(aTemp).toStrictEqual([2, 4])
  expect(bTemp).toStrictEqual([6, 8])
})

test("drops missing values pairwise on vectors that contain only missing values", () => {
  const a = [null, null, null, null]
  const b = [undefined, undefined, undefined, undefined]
  const [aTemp, bTemp] = dropMissingPairwise(a, b)
  expect(aTemp.length).toBe(0)
  expect(bTemp.length).toBe(0)
})

test("drops missing values pairwise on vectors of differing lengths", () => {
  const a = [1, 2, 3]
  const b = [4, 5, 6, 7, 8, 9, 10]
  const [aTemp, bTemp] = dropMissingPairwise(a, b)
  expect(aTemp).toStrictEqual([1, 2, 3])
  expect(bTemp).toStrictEqual([4, 5, 6])
})

test("throws an error when attempting to drop missing values pairwise on non-vectors", () => {
  expect(() => {
    dropMissingPairwise()
  }).toThrow()

  expect(() => {
    dropMissingPairwise("foo", "bar")
  }).toThrow()

  expect(() => {
    dropMissingPairwise(3, 4)
  }).toThrow()

  expect(() => {
    dropMissingPairwise({}, [])
  }).toThrow()

  expect(() => {
    dropMissingPairwise(() => {}, true)
  }).toThrow()

  expect(() => {
    const a = normal([5, 10])
    const b = normal([5, 10])
    dropMissingPairwise(a, b)
  }).toThrow()
})

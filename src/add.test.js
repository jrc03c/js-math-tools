const add = require("./add.js")

test("adds 1 and 2 to get 3", () => {
  expect(add(1, 2)).toBe(3)
})

test("adds -1 and -2 to get -3", () => {
  expect(add(-1, -2)).toBe(-3)
})

test("adds 1 and -2 to get -1", () => {
  expect(add(1, -2)).toBe(-1)
})

test("adds -1 and 2 to get 1", () => {
  expect(add(-1, 2)).toBe(1)
})

test("adds [2, 3, 4] and 5 to get [7, 8, 9]", () => {
  expect(add([2, 3, 4], 5)).toStrictEqual([7, 8, 9])
})

test("adds -5 and [2, 3, 4] to get [-3, -2, -1]", () => {
  expect(add(-5, [2, 3, 4])).toStrictEqual([-3, -2, -1])
})

test("adds [2, 3, 4] and [4, 5, 6] to get [6, 8, 10]", () => {
  expect(add([2, 3, 4], [4, 5, 6])).toStrictEqual([6, 8, 10])
})

test("adds [2, 3, 4] and [4, 5, 6, 7] to throw an error", () => {
  expect(() => {
    add([2, 3, 4], [4, 5, 6, 7])
  }).toThrow()
})

test("adds 2 and 'foo' to throw an error", () => {
  expect(add(2, "foo")).toBeNaN()
})

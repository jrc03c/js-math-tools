const count = require("./count.js")
const sort = require("./sort.js")

test("gets count of items one at a time", () => {
  const x = [2, 3, 4, 2, 3, 4, 2, 3, 2, 3, 2]
  expect(count(x, 2)).toBe(5)
  expect(count(x, 3)).toBe(4)
  expect(count(x, 4)).toBe(2)
  expect(count(x, 5)).toBe(0)
})

test("gets counts of an array of items", () => {
  const x = [2, 3, 4, 2, 3, 4, 2, 3, 2, 3, 2]

  const counts = sort(count(x, [2, 3]), (a, b) => {
    return a.item - b.item
  })

  expect(counts).toStrictEqual([
    { item: 2, count: 5 },
    { item: 3, count: 4 },
  ])
})

test("gets counts of items of mixed types", () => {
  const x = [
    "foo",
    "foo",
    true,
    true,
    true,
    true,
    true,
    "foo",
    "baz",
    { hello: "world" },
    { hello: "world" },
    { foo: "bar" },
    { foo: "bar" },
    { foo: "bar" },
    { foo: "bar" },
  ]

  const counts = sort(count(x), (a, b) => {
    return b.count - a.count
  })

  expect(counts).toStrictEqual([
    { item: true, count: 5 },
    { item: { foo: "bar" }, count: 4 },
    { item: "foo", count: 3 },
    { item: { hello: "world" }, count: 2 },
    { item: "baz", count: 1 },
  ])
})

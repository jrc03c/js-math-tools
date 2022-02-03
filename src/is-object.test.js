const isObject = require("./is-object.js")

test("checks to see if various things are objects", () => {
  class Foo {}

  const rights = [{}, { hello: "world", items: [2, 3, 4] }, new Foo()]

  rights.forEach(right => {
    expect(isObject(right)).toBe(true)
  })

  const wrongs = [234, "foo", true, false, null, undefined, () => {}, [2, 3, 4]]

  wrongs.forEach(wrong => {
    expect(isObject(wrong)).toBe(false)
  })
})

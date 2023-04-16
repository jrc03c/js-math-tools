const { copy } = require("./copy")
const { DataFrame, Series } = require("./dataframe")
const isEqual = require("./is-equal")
const isTheSameObject = (a, b) => a === b

function isACopy(a, b) {
  if (typeof a === "object" && typeof b === "object" && a !== null) {
    return isEqual(a, b) && !isTheSameObject(a, b)
  } else {
    return isEqual(a, b)
  }
}

test("tests that values can be copied correctly", () => {
  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

  const simples = [
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
  ]

  simples.forEach(v => {
    if (!isEqual(v, copy(v))) {
      console.log(v)
    }

    expect(isEqual(v, copy(v))).toBe(true)
  })

  const complexes = [
    [2, 3, 4, Symbol.for("bug")],
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    { hello: "world" },
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  complexes.forEach(v => {
    const c = copy(v)
    expect(isACopy(v, c)).toBe(true)
  })
})

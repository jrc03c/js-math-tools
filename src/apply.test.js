const { DataFrame, Series } = require("./dataframe")
const apply = require("./apply")

test("tests that the `apply` function works correctly", () => {
  const x = [
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
    [2, 3, 4],
    [
      [2, 3, 4],
      [5, 6, 7, 8, 9],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    [[[new Series({ hello: [10, 20, 30, 40, 50] })]]],
    [[[[new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] })]]]],
  ]

  const yTrue = [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "string",
    "boolean",
    "boolean",
    "object",
    "undefined",
    "symbol",
    ["number", "number", "number"],
    [
      ["number", "number", "number"],
      ["number", "number", "number", "number", "number"],
    ],
    "function",
    "function",
    "object",
    [
      [
        [
          new Series({
            hello: ["number", "number", "number", "number", "number"],
          }),
        ],
      ],
    ],
    [
      [
        [
          [
            new DataFrame({
              foo: ["number", "number", "number", "number", "number"],
              bar: ["number", "number", "number", "number", "number"],
            }),
          ],
        ],
      ],
    ],
  ]

  const yPred = apply(x, v => typeof v)
  expect(yPred).toStrictEqual(yTrue)
})

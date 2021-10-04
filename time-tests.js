require(".").dump()
const N = 99999

function loop(fn, args, n) {
  return function () {
    for (let i = 0; i < n; i++) {
      if (args) {
        fn(...args)
      } else {
        fn()
      }
    }
  }
}

const pairs = [
  // ["abs", [234]],
  // ["add", [3, 4]],
  // ["append", [2, 3, 4], [5, 6, 7]],
  // ["apply", 2, x => x * 2],
  // ["arccos", Math.PI / 2],
  // ["arcsin", Math.PI / 2],
  // ["arctan", Math.PI / 2],
  // ["argmax", [2, 3, 4]],
  // ["argmin", [2, 3, 4]],
  // ["ceil", 2.5],
  // ["chop", 1e-20],
  // ["clamp", 2, 3, 4],
  // ["cohensd", [2, 3, 4], [3, 4, 5]],
  // ["copy", { foo: "bar" }],
  // ["correl", [2, 3, 4], [5, 6, 7]],
  // ["cos", 234],
  // ["count", [2, 3, 4], 2],
  // ["covariance", [2, 3, 4], [3, 4, 5]],
  // ["diff", [2, 3, 4], [3, 4, 5]],
  // ["distance", [2, 3, 4], [3, 4, 5]],
  // ["divide", 2, 3],
  // ["dot", [2, 3, 4], [3, 4, 5]],
  // ["dropMissingPairwise", [2, null, 4], [3, 4, null]],
  // ["dropMissing", [2, 3, null]],
  // ["dropNaN", [2, 3, null]],
  // ["flatten", [[[2, 3, 4]]]],
  // ["float", "234.567"],
  // ["floor", 234.567],
  // ["getValueAt", [2, 3, 4], 0],
  // ["identity", 5],
  // ["indexOf", [2, 3, 4], 2],
  // ["int", "234.567"],
  // ["intersect", [2, 3, 4], [3, 4, 5]],
  // ["inverse", identity(3)],
  // ["isArray", [2, 3, 4]],
  // ["isBoolean", true],
  // ["isEqual", [2, 3, 4], [2, 3, 4]],
  // ["isFunction", () => {}],
  // ["isNumber", 234],
  // ["isString", "foobar"],
  // ["isUndefined", null],
  // ["lerp", 0, 10, 0.5],
  // ["log", 234],
  // ["map", 1, 2, 3, 4, 5],
  // ["max", [2, 3, 4]],
  // ["mean", [2, 3, 4]],
  // ["median", [2, 3, 4]],
  // ["min", [2, 3, 4]],
  // ["mode", [2, 3, 4]],
  // ["multiply", 234, 345],
  // ["ndarray", [2, 3, 4]],
  ["normal", [2, 3, 4]],
  // ["ones", [2, 3, 4]],
  // ["pow", 2, 3],
  ["random", [2, 3, 4]],
  // ["range", 0, 100],
  // ["reshape", [2, 3, 4], [3, 1]],
  // ["reverse", [2, 3, 4]],
  // ["round", 234.567],
  // ["scale", 234, 345],
  // ["seed", 12345],
  // ["setValueAt", [2, 3, 4], 0, true],
  // ["set", [2, 3, 4]],
  // ["shape", [2, 3, 4]],
  // ["shuffle", [2, 3, 4]],
  // ["sign", -234],
  // ["sin", 234],
  // ["sort", [2, 3, 4]],
  // ["sqrt", 234],
  // ["stdev", [2, 3, 4]],
  // ["subtract", 234, 345],
  // ["sum", [2, 3, 4]],
  // ["tan", 234],
  // ["transpose", [[2, 3, 4]]],
  // ["union", [2, 3, 4], [3, 4, 5]],
  // ["variance", [2, 3, 4]],
  // ["where", [2, 3, 4], () => {}],
  // ["zeros", [2, 3, 4]],
]

const results = { function: [], time: [] }

pairs.forEach(pair => {
  const name = pair[0]
  const args = pair.slice(1)
  const fn = eval(name)
  const ms = time(loop(fn, args, N))
  results.function.push(name)
  results.time.push(ms)
  console.log(name, ms)
})

// const df = new DataFrame(results)
// df.sort("time").print().toCSV("time-tests-results.csv")

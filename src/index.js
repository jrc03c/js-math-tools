const { copy, decycle } = require("./copy")
const { DataFrame, Series } = require("./dataframe")

const out = {
  abs: require("./abs"),
  add: require("./add"),
  apply: require("./apply"),
  arccos: require("./arccos"),
  arcsin: require("./arcsin"),
  arctan: require("./arctan"),
  argmax: require("./argmax"),
  argmin: require("./argmin"),
  assert: require("./assert"),
  cast: require("./cast"),
  ceil: require("./ceil"),
  chop: require("./chop"),
  clamp: require("./clamp"),
  combinations: require("./combinations"),
  copy,
  correl: require("./correl"),
  cos: require("./cos"),
  count: require("./count"),
  covariance: require("./covariance"),
  DataFrame,
  dataTypes: require("./helpers/data-types"),
  decycle,
  diff: require("./diff"),
  distance: require("./distance"),
  divide: require("./divide"),
  dot: require("./dot"),
  dropMissing: require("./drop-missing"),
  dropMissingPairwise: require("./drop-missing-pairwise"),
  dropNaN: require("./drop-nan"),
  dropNaNPairwise: require("./drop-nan-pairwise"),
  dropUndefined: require("./drop-undefined"),
  exp: require("./exp"),
  factorial: require("./factorial"),
  find: require("./find"),
  findAll: require("./find-all"),
  flatten: require("./flatten"),
  float: require("./float"),
  floor: require("./floor"),
  identity: require("./identity"),
  indexOf: require("./index-of"),
  inferType: require("./infer-type"),
  int: require("./int"),
  intersect: require("./intersect"),
  inverse: require("./inverse"),
  isArray: require("./is-array"),
  isBoolean: require("./is-boolean"),
  isBrowser: require("./helpers/is-browser"),
  isDataFrame: require("./is-dataframe"),
  isDate: require("./is-date"),
  isEqual: require("./is-equal"),
  isFunction: require("./is-function"),
  isJagged: require("./is-jagged"),
  isNested: require("./is-nested"),
  isNumber: require("./is-number"),
  isObject: require("./is-object"),
  isSeries: require("./is-series"),
  isString: require("./is-string"),
  isUndefined: require("./is-undefined"),
  lerp: require("./lerp"),
  log: require("./log"),
  MathError: require("./math-error"),
  max: require("./max"),
  mean: require("./mean"),
  median: require("./median"),
  min: require("./min"),
  mod: require("./mod"),
  mode: require("./mode"),
  multiply: require("./multiply"),
  ndarray: require("./ndarray"),
  normal: require("./normal"),
  ones: require("./ones"),
  permutations: require("./permutations"),
  pow: require("./pow"),
  print: require("./print"),
  product: require("./product"),
  random: require("./random").random,
  range: require("./range"),
  remap: require("./remap"),
  reshape: require("./reshape"),
  reverse: require("./reverse"),
  round: require("./round"),
  scale: require("./scale"),
  seed: require("./random").seed,
  Series,
  set: require("./set"),
  shape: require("./shape"),
  shuffle: require("./shuffle"),
  sign: require("./sign"),
  sin: require("./sin"),
  sort: require("./sort"),
  sqrt: require("./sqrt"),
  std: require("./std"),
  stdev: require("./stdev"),
  subtract: require("./subtract"),
  sum: require("./sum"),
  tan: require("./tan"),
  time: require("./time").timeSync,
  timeSync: require("./time").timeSync,
  timeAsync: require("./time").timeAsync,
  transpose: require("./transpose"),
  union: require("./union"),
  variance: require("./variance"),
  vectorize: require("./vectorize"),
  zeros: require("./zeros"),
  zip: require("./zip"),

  dump: function () {
    const context =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof global !== "undefined"
        ? global
        : typeof window !== "undefined"
        ? window
        : typeof self !== "undefined"
        ? self
        : undefined

    if (!context) {
      throw new out.MathError(
        "Cannot dump functions into global scope because none of `globalThis`, `global`, `window`, or `self` exist in the current context!"
      )
    }

    Object.keys(out).forEach(key => {
      try {
        Object.defineProperty(context, key, {
          configurable: false,
          enumerable: true,
          writable: false,
          value: out[key],
        })
      } catch (e) {
        context[key] = out[key]
      }
    })
  },
}

if (typeof module !== "undefined") {
  module.exports = out
}

if (typeof window !== "undefined") {
  window.JSMathTools = out
}

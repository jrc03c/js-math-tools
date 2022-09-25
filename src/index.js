const { DataFrame, Series } = require("./dataframe")

const out = {
  abs: require("./abs.js"),
  add: require("./add.js"),
  apply: require("./apply.js"),
  arccos: require("./arccos.js"),
  arcsin: require("./arcsin.js"),
  arctan: require("./arctan.js"),
  argmax: require("./argmax.js"),
  argmin: require("./argmin.js"),
  assert: require("./assert.js"),
  ceil: require("./ceil.js"),
  chop: require("./chop.js"),
  clamp: require("./clamp.js"),
  combinations: require("./combinations.js"),
  copy: require("./copy.js"),
  correl: require("./correl.js"),
  cos: require("./cos.js"),
  count: require("./count.js"),
  covariance: require("./covariance.js"),
  DataFrame,
  diff: require("./diff.js"),
  distance: require("./distance.js"),
  divide: require("./divide.js"),
  dot: require("./dot.js"),
  dropMissing: require("./drop-missing.js"),
  dropMissingPairwise: require("./drop-missing-pairwise.js"),
  dropNaN: require("./drop-nan.js"),
  dropNaNPairwise: require("./drop-nan-pairwise.js"),
  dropUndefined: require("./drop-undefined.js"),
  exp: require("./exp.js"),
  factorial: require("./factorial.js"),
  find: require("./find.js"),
  findAll: require("./find-all.js"),
  flatten: require("./flatten.js"),
  float: require("./float.js"),
  floor: require("./floor.js"),
  identity: require("./identity.js"),
  indexOf: require("./index-of.js"),
  int: require("./int.js"),
  intersect: require("./intersect.js"),
  inverse: require("./inverse.js"),
  isArray: require("./is-array.js"),
  isBoolean: require("./is-boolean.js"),
  isDataFrame: require("./is-dataframe.js"),
  isEqual: require("./is-equal.js"),
  isFunction: require("./is-function.js"),
  isJagged: require("./is-jagged.js"),
  isNested: require("./is-nested.js"),
  isNumber: require("./is-number.js"),
  isObject: require("./is-object.js"),
  isSeries: require("./is-series.js"),
  isString: require("./is-string.js"),
  isUndefined: require("./is-undefined.js"),
  lerp: require("./lerp.js"),
  log: require("./log.js"),
  MathError: require("./math-error.js"),
  max: require("./max.js"),
  mean: require("./mean.js"),
  median: require("./median.js"),
  min: require("./min.js"),
  mod: require("./mod.js"),
  mode: require("./mode.js"),
  multiply: require("./multiply.js"),
  ndarray: require("./ndarray.js"),
  normal: require("./normal.js"),
  ones: require("./ones.js"),
  permutations: require("./permutations.js"),
  pow: require("./pow.js"),
  print: require("./print.js"),
  product: require("./product.js"),
  random: require("./random.js").random,
  range: require("./range.js"),
  remap: require("./remap.js"),
  reshape: require("./reshape.js"),
  reverse: require("./reverse.js"),
  round: require("./round.js"),
  scale: require("./scale.js"),
  seed: require("./random.js").seed,
  Series,
  set: require("./set.js"),
  shape: require("./shape.js"),
  shuffle: require("./shuffle.js"),
  sign: require("./sign.js"),
  sin: require("./sin.js"),
  sort: require("./sort.js"),
  sqrt: require("./sqrt.js"),
  std: require("./std.js"),
  stdev: require("./stdev.js"),
  subtract: require("./subtract.js"),
  sum: require("./sum.js"),
  tan: require("./tan.js"),
  time: require("./time.js").timeSync,
  timeSync: require("./time.js").timeSync,
  timeAsync: require("./time.js").timeAsync,
  transpose: require("./transpose.js"),
  union: require("./union.js"),
  variance: require("./variance.js"),
  vectorize: require("./vectorize.js"),
  zeros: require("./zeros.js"),
  zip: require("./zip.js"),

  dump: function () {
    const public = typeof global !== "undefined" ? global : window

    if (!public) {
      throw new out.MathError(
        "Cannot dump functions into global scope because neither `global` nor `window` exist in the current context!"
      )
    }

    Object.keys(out).forEach(key => {
      try {
        Object.defineProperty(public, key, {
          configurable: false,
          enumerable: true,
          writable: false,
          value: out[key],
        })
      } catch (e) {
        public[key] = out[key]
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

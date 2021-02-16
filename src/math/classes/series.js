let assert = require("../../misc/assert.js")
let isArray = require("../is-array.js")
let isUndefined = require("../is-undefined.js")
let shape = require("../shape.js")
let transpose = require("../transpose.js")
let range = require("../range.js")
let isNumber = require("../is-number.js")
let isString = require("../is-string.js")
let apply = require("../../misc/apply.js")
let isFunction = require("../is-function.js")
let ndarray = require("../ndarray.js")
let copy = require("../copy.js")
let set = require("../set.js")
let reverse = require("../reverse.js")

function isInteger(x){
  return isNumber(x) && parseInt(x) === x
}

function isWholeNumber(x){
  return isInteger(x) && x >= 0
}

function isObject(x){
  return x instanceof Object && !isArray(x)
}

function isDataFrame(x){
  return x instanceof DataFrame
}

function isSeries(x){
  return x instanceof Series
}

class Series {
  constructor(data){
    let self = this
    self.name = "data"

    Object.defineProperty(self, "_values", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "values", {
      configurable: true,
      enumerable: true,

      get(){
        return self._values
      },

      set(x){
        assert(isArray(x), "The new values must be a 1-dimensional array!")

        let dataShape = shape(x)
        assert(dataShape.length === 1, "The new array of values must be 1-dimensional!")

        if (dataShape[0] < self._index.length){
          self._index = self._index.slice(0, dataShape[0])
        } else if (dataShape[0] > self._index.length){
          self._index = self._index.concat(range(self._index.length, dataShape[0]).map(i => "row" + i))
        }

        self._values = x
      },
    })

    Object.defineProperty(self, "_index", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "index", {
      configurable: true,
      enumerable: true,

      get(){
        return self._index
      },

      set(x){
        assert(isArray(x), "The new index must be a 1-dimensional array of strings!")
        assert(x.length === self.shape[0], "The new index must be the same length as the old index!")
        assert(shape(x).length === 1, "The new index must be a 1-dimensional array of strings!")

        x.forEach(value => {
          assert(isString(value), "All of the row names must be strings!")
        })

        self._index = x
      },
    })

    if (data){
      let dataShape = shape(data)
      assert(dataShape.length === 1, "The `data` array passed into the constructor of a DataFrame must be 1-dimensional!")
      self.values = data
    }
  }

  get shape(){
    let self = this
    return shape(self.values)
  }

  isEmpty(){
    let self = this
    return set(self.values).length === 0
  }

  clear(){
    let self = this
    let out = self.copy()
    out.values = ndarray(out.shape)
    out.index = self.index
    return out
  }

  getSubsetByNames(indices){
    let self = this

    if (isUndefined(indices)) indices = self.index

    assert(isArray(indices), "The `indices` array must be a 1-dimensional array of strings.")
    assert(shape(indices).length === 1, "The `indices` array must be a 1-dimensional array of strings.")
    assert(indices.length > 0, "The `indices` array must contain at least one index name.")

    indices.forEach(name => {
      assert(isString(name), "The `indices` array must contain only strings.")
      assert(self.index.indexOf(name) > -1, `The name "${name}" does not exist in the index.`)
    })

    let values = indices.map(name => {
      return self.values[self.index.indexOf(name)]
    })

    let out = new Series(values)
    out.index = indices
    return out
  }

  getSubsetByIndices(indices){
    let self = this
    let dataShape = self.shape

    if (isUndefined(indices)) indices = range(0, dataShape[0])

    assert(isArray(indices), "The `indices` array must be 1-dimensional array of whole numbers.")
    assert(shape(indices).length === 1, "The `indices` array must be a 1-dimensional array of whole numbers.")
    assert(indices.length > 0, "The `indices` array must contain at least one index.")

    indices.forEach(index => {
      assert(isWholeNumber(index), "The `indices` array must be a 1-dimensional array of whole numbers.")
      assert(index < self.index.length, `The row index ${index} is out of bounds.`)
    })

    let rows = indices.map(i => self.index[i])
    return self.getSubsetByNames(rows)
  }

  loc(indices){
    let self = this
    return self.getSubsetByNames(indices)
  }

  iloc(indices){
    let self = this
    return self.getSubsetByIndices(indices)
  }

  reverse(){
    let self = this
    let out = new Series(reverse(self.values))
    out.index = reverse(self.index)
    return out
  }

  resetIndex(){
    let self = this
    let out = self.copy()
    out.index = range(0, self.shape[0]).map(i => "row" + i)
    return out
  }

  copy(){
    let self = this
    if (self.isEmpty()) return new Series()
    let out = new Series(copy(self.values))
    out.index = self.index.slice()
    return out
  }

  apply(fn){
    assert(isFunction(fn), "The parameter to the `apply` method must be a function.")

    let self = this
    let out = self.copy()
    out.values = out.values.map((v, i) => fn(out.index[i], v))
    return out
  }

  dropMissing(condition, threshold){
    let self = this
    let out = self.copy()
    let outIndex = []

    out.values = out.values.filter((v, i) => {
      if (isUndefined(v)){
        return false
      } else {
        outIndex.push(out.index[i])
        return true
      }
    })

    out.index = outIndex
    return out
  }
}

module.exports = Series

// tests
if (!module.parent && typeof(window) === "undefined"){
  let isEqual = require("../is-equal.js")
  let normal = require("../normal.js")
  let set = require("../set.js")
  let distance = require("../distance.js")
  let zeros = require("../zeros.js")
  let chop = require("../chop.js")
  let random = require("../random.js")

  let x = normal(100)
  let series = new Series(x)
  let seriesShape = series.shape

  assert(isSeries(series), "`series` is not a Series!")
  assert(isEqual(series.shape, [100]), "The shape of the Series is not the same as the shape of its data!")
  assert(!series.isEmpty(), "`series` should not be empty!")
  assert((new Series()).isEmpty(), "New Series should be empty!")

  let clearedValues = set(series.clear().values)
  assert(clearedValues.length === 1 && isUndefined(clearedValues[0]), "Cleared Series should only have `undefined` values.")

  assert(isEqual(series.values, series.reverse().reverse().values), "A doubly-reversed series should have the same values as the original!")

  let hasFailed = false

  try {
    series.loc(series.index)
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(!hasFailed, "`series.loc(series.index)` should not have failed!")

  try {
    series.loc([])
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`series.loc([])` should have failed!")

  try {
    series.loc(["this doesn't exist"])
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`series.loc([\"this doesn't exist\"])` should have failed!")

  try {
    series.iloc(range(0, seriesShape[0]))
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(!hasFailed, "`series.iloc(range(0, seriesShape[0]))` should not have failed!")

  try {
    series.iloc()
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(!hasFailed, "`series.iloc()` should not have failed!")

  try {
    series.iloc([-5])
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`series.iloc([-5])` should have failed!")

  try {
    series.iloc([500])
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`series.iloc([500])` should have failed!")

  let series2 = series.copy()
  assert(isEqual(series, series2), "A Series and its copy should evaluate as equal!")
  assert(!(series === series2), "A Series and its copy should not be the same object!")

  series.index = range(0, seriesShape[0]).map(i => Math.random().toString())
  assert(!isEqual(series.index, series2.index), "`series` should now have random row names!")

  series = series.resetIndex()
  assert(isEqual(series.index, series2.index), "`series` should now have its original row names!")

  series = new Series([0, 1, 2, 3, 4])

  series = series.apply((name, value) => {
    return name + "/" + value
  })

  assert(isEqual(series.values, ["row0/0", "row1/1", "row2/2", "row3/3", "row4/4"]), "The Series' values should be as I described!")

  series = new Series(range(0, 10))
  series.values[0] = null
  series.values[7] = null

  assert(isEqual(series.dropMissing().shape, [8]), "The Series should have a shape of [8] after dropping missing values!")
  assert(isEqual(series.dropMissing().index, ["row1", "row2", "row3", "row4", "row5", "row6", "row8", "row9"]), "The Series' new index should be as I've described!")
  assert(series.clear().dropMissing().isEmpty(), "The Series should be empty after dropping missing values!")

  console.log("All tests passed!")
}

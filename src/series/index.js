const assert = require("../assert.js")
const copy = require("../copy.js")
const isArray = require("../is-array.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const leftPad = require("../helpers/left-pad.js")
const ndarray = require("../ndarray.js")
const range = require("../range.js")
const reverse = require("../reverse.js")
const seriesApply = require("./series-apply.js")
const seriesDropMissing = require("./series-drop-missing.js")
const seriesDropNaN = require("./series-drop-nan.js")
const seriesFilter = require("./series-filter.js")
const seriesGet = require("./series-get.js")
const seriesGetSubsetByIndices = require("./series-get-subset-by-indices.js")
const seriesGetSubsetByNames = require("./series-get-subset-by-names.js")
const seriesPrint = require("./series-print.js")
const seriesSort = require("./series-sort.js")
const seriesSortByIndex = require("./series-sort-by-index.js")
const seriesToObject = require("./series-to-object.js")
const shape = require("../shape.js")
const transpose = require("../transpose.js")

const SERIES_SYMBOL = Symbol.for("@jrc03c/js-math-tools/series")

module.exports = function (DataFrame) {
  class Series {
    static [Symbol.hasInstance](x) {
      try {
        return !!x.symbol && x.symbol === SERIES_SYMBOL
      } catch (e) {
        return false
      }
    }

    constructor(data) {
      const self = this
      self.name = "data"

      Object.defineProperty(self, "symbol", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: SERIES_SYMBOL,
      })

      Object.defineProperty(self, "_values", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true,
      })

      Object.defineProperty(self, "values", {
        configurable: true,
        enumerable: true,

        get() {
          return self._values
        },

        set(x) {
          assert(isArray(x), "The new values must be a 1-dimensional array!")

          const dataShape = shape(x)

          assert(
            dataShape.length === 1,
            "The new array of values must be 1-dimensional!"
          )

          if (dataShape[0] < self._index.length) {
            self._index = self._index.slice(0, dataShape[0])
          } else if (dataShape[0] > self._index.length) {
            self._index = self._index.concat(
              range(self._index.length, dataShape[0]).map(i => {
                return "row" + leftPad(i, (x.length - 1).toString().length)
              })
            )
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

        get() {
          return self._index
        },

        set(x) {
          assert(
            isArray(x),
            "The new index must be a 1-dimensional array of strings!"
          )

          assert(
            x.length === self.shape[0],
            "The new index must be the same length as the old index!"
          )

          assert(
            shape(x).length === 1,
            "The new index must be a 1-dimensional array of strings!"
          )

          x.forEach(value => {
            assert(isString(value), "All of the row names must be strings!")
          })

          self._index = x
        },
      })

      if (data) {
        if (data instanceof Series) {
          self.name = data.name
          self.index = copy(data.index)
          self.values = copy(data.values)
        } else if (isArray(data)) {
          const dataShape = shape(data)

          assert(
            dataShape.length === 1,
            "When passing an array into the constructor of a Series, the array must be 1-dimensional!"
          )

          self.values = data
        } else if (data instanceof Object) {
          const keys = Object.keys(data)

          assert(
            keys.length === 1,
            "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!"
          )

          const name = keys[0]
          const values = data[name]

          assert(
            shape(values).length === 1,
            "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!"
          )

          self.name = name
          self.values = copy(values)
        }
      }
    }

    get shape() {
      const self = this
      return shape(self.values)
    }

    get length() {
      const self = this
      return self.shape[0]
    }

    get isEmpty() {
      const self = this
      return self.values.filter(v => !isUndefined(v)).length === 0
    }

    clear() {
      const self = this
      const out = self.copy()
      out.values = ndarray(out.shape)
      out.index = self.index
      return out
    }

    get(indices) {
      const self = this
      return seriesGet(self, indices)
    }

    getSubsetByNames(indices) {
      const self = this
      return seriesGetSubsetByNames(Series, self, indices)
    }

    getSubsetByIndices(indices) {
      const self = this
      return seriesGetSubsetByIndices(self, indices)
    }

    loc(indices) {
      const self = this
      return self.getSubsetByNames(indices)
    }

    iloc(indices) {
      const self = this
      return self.getSubsetByIndices(indices)
    }

    reverse() {
      const self = this
      const out = new Series(reverse(self.values))
      out.index = reverse(self.index)
      out.name = self.name
      return out
    }

    resetIndex() {
      const self = this
      const out = self.copy()

      out.index = range(0, self.shape[0]).map(i => {
        return "row" + leftPad(i, (out.index.length - 1).toString().length)
      })

      return out
    }

    copy() {
      const self = this
      const out = new Series(copy(self.values))
      out.index = self.index.slice()
      out.name = self.name
      return out
    }

    apply(fn) {
      const self = this
      return seriesApply(self, fn)
    }

    dropMissing(condition, threshold) {
      const self = this
      return seriesDropMissing(self, condition, threshold)
    }

    dropNaN() {
      const self = this
      return seriesDropNaN(Series, self)
    }

    toObject() {
      const self = this
      return seriesToObject(self)
    }

    print() {
      const self = this
      return seriesPrint(self)
    }

    sort(direction) {
      const self = this
      return seriesSort(Series, self, direction)
    }

    sortByIndex() {
      const self = this
      return seriesSortByIndex(Series, self)
    }

    filter(fn) {
      const self = this
      return seriesFilter(Series, self, fn)
    }

    toDataFrame() {
      const self = this
      const out = new DataFrame(transpose([self.values]))
      out.columns = [self.name]
      out.index = self.index
      return out
    }

    getDummies() {
      const self = this
      return self.toDataFrame().getDummies()
    }

    oneHotEncode() {
      const self = this
      return self.getDummies()
    }
  }

  return Series
}

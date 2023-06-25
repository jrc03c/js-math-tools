const { copy } = require("../copy")
const assert = require("../assert")
const isArray = require("../is-array")
const isString = require("../is-string")
const isUndefined = require("../is-undefined")
const leftPad = require("../helpers/left-pad")
const range = require("../range")
const reverse = require("../reverse")
const seriesAppend = require("./series-append")
const seriesApply = require("./series-apply")
const seriesDropMissing = require("./series-drop-missing")
const seriesDropNaN = require("./series-drop-nan")
const seriesFilter = require("./series-filter")
const seriesGet = require("./series-get")
const seriesGetSubsetByIndices = require("./series-get-subset-by-indices")
const seriesGetSubsetByNames = require("./series-get-subset-by-names")
const seriesPrint = require("./series-print")
const seriesShuffle = require("./series-shuffle")
const seriesSort = require("./series-sort")
const seriesSortByIndex = require("./series-sort-by-index")
const seriesToObject = require("./series-to-object")
const shape = require("../shape")
const transpose = require("../transpose")

const SERIES_SYMBOL = Symbol.for("@jrc03c/js-math-tools/series")

module.exports = function (DataFrame) {
  class Series {
    static [Symbol.hasInstance](x) {
      try {
        return !!x._symbol && x._symbol === SERIES_SYMBOL
      } catch (e) {
        return false
      }
    }

    constructor(data) {
      const self = this
      self.name = "data"

      Object.defineProperty(self, "_symbol", {
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
                return "item" + leftPad(i, (x.length - 1).toString().length)
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
          self.values = copy(data.values)
          self.index = copy(data.index)
        } else if (isArray(data)) {
          const dataShape = shape(data)

          assert(
            dataShape.length === 1,
            "When passing an array into the constructor of a Series, the array must be 1-dimensional!"
          )

          self.values = data
        } else if (data instanceof Object) {
          const keys = Object.keys(data)
            .concat(Object.getOwnPropertySymbols(data))
            .map(v => v.toString())

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
          self.values = values.slice()
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

      out.values.forEach((v, i) => {
        out.values[i] = undefined
      })

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
        return "item" + leftPad(i, (out.index.length - 1).toString().length)
      })

      return out
    }

    copy() {
      const self = this
      const out = new Series()
      out._values = copy(self.values)
      out._index = copy(self.index)
      out.name = self.name
      return out
    }

    append(x) {
      const self = this
      return seriesAppend(Series, self, x)
    }

    apply(fn) {
      const self = this
      return seriesApply(self, fn)
    }

    concat(x) {
      const self = this
      return self.append(x)
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

    shuffle() {
      const self = this
      return seriesShuffle(self)
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

    transpose() {
      const self = this
      const out = self.copy()
      out.values = reverse(out.values)
      out.index = reverse(out.index)
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

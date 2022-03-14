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

module.exports = function (DataFrame) {
  class Series {
    constructor(data) {
      const self = this
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
        const dataShape = shape(data)

        assert(
          dataShape.length === 1,
          "The `data` array passed into the constructor of a DataFrame must be 1-dimensional!"
        )

        self.values = data
      }
    }

    get shape() {
      const self = this
      return shape(self.values)
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

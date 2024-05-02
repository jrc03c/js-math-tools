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
      this.name = "data"

      Object.defineProperty(this, "_symbol", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: SERIES_SYMBOL,
      })

      Object.defineProperty(this, "_values", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true,
      })

      Object.defineProperty(this, "values", {
        configurable: true,
        enumerable: true,

        get() {
          return this._values
        },

        set(x) {
          assert(isArray(x), "The new values must be a 1-dimensional array!")

          const dataShape = shape(x)

          assert(
            dataShape.length === 1,
            "The new array of values must be 1-dimensional!"
          )

          if (dataShape[0] < this._index.length) {
            this._index = this._index.slice(0, dataShape[0])
          } else if (dataShape[0] > this._index.length) {
            this._index = this._index.concat(
              range(this._index.length, dataShape[0]).map(i => {
                return "item" + leftPad(i, (x.length - 1).toString().length)
              })
            )
          }

          this._values = x
        },
      })

      Object.defineProperty(this, "_index", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true,
      })

      Object.defineProperty(this, "index", {
        configurable: true,
        enumerable: true,

        get() {
          return this._index
        },

        set(x) {
          assert(
            isArray(x),
            "The new index must be a 1-dimensional array of strings!"
          )

          assert(
            x.length === this.shape[0],
            "The new index must be the same length as the old index!"
          )

          assert(
            shape(x).length === 1,
            "The new index must be a 1-dimensional array of strings!"
          )

          x.forEach(value => {
            assert(isString(value), "All of the row names must be strings!")
          })

          this._index = x
        },
      })

      if (data) {
        if (data instanceof Series) {
          this.name = data.name
          this.values = copy(data.values)
          this.index = copy(data.index)
        } else if (isArray(data)) {
          const dataShape = shape(data)

          assert(
            dataShape.length === 1,
            "When passing an array into the constructor of a Series, the array must be 1-dimensional!"
          )

          this.values = data
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

          this.name = name
          this.values = values.slice()
        }
      }
    }

    get shape() {
      return shape(this.values)
    }

    get length() {
      return this.shape[0]
    }

    get isEmpty() {
      return this.values.filter(v => !isUndefined(v)).length === 0
    }

    clear() {
      const out = this.copy()

      out.values.forEach((v, i) => {
        out.values[i] = undefined
      })

      return out
    }

    get(indices) {
      return seriesGet(this, indices)
    }

    getSubsetByNames(indices) {
      return seriesGetSubsetByNames(Series, this, indices)
    }

    getSubsetByIndices(indices) {
      return seriesGetSubsetByIndices(this, indices)
    }

    loc(indices) {
      return this.getSubsetByNames(indices)
    }

    iloc(indices) {
      return this.getSubsetByIndices(indices)
    }

    reverse() {
      const out = new Series(reverse(this.values))
      out.index = reverse(this.index)
      out.name = this.name
      return out
    }

    resetIndex() {
      const out = this.copy()

      out.index = range(0, this.shape[0]).map(i => {
        return "item" + leftPad(i, (out.index.length - 1).toString().length)
      })

      return out
    }

    copy() {
      const out = new Series()
      out._values = copy(this.values)
      out._index = copy(this.index)
      out.name = this.name
      return out
    }

    append(x) {
      return seriesAppend(Series, this, x)
    }

    apply(fn) {
      return seriesApply(this, fn)
    }

    concat(x) {
      return this.append(x)
    }

    dropMissing(condition, threshold) {
      return seriesDropMissing(this, condition, threshold)
    }

    dropNaN() {
      return seriesDropNaN(Series, this)
    }

    toObject() {
      return seriesToObject(this)
    }

    print() {
      return seriesPrint(this)
    }

    shuffle() {
      return seriesShuffle(this)
    }

    sort(direction) {
      return seriesSort(Series, this, direction)
    }

    sortByIndex() {
      return seriesSortByIndex(Series, this)
    }

    filter(fn) {
      return seriesFilter(Series, this, fn)
    }

    toDataFrame() {
      const out = new DataFrame(transpose([this.values]))
      out.columns = [this.name]
      out.index = this.index
      return out
    }

    transpose() {
      const out = this.copy()
      out.values = reverse(out.values)
      out.index = reverse(out.index)
      return out
    }

    getDummies() {
      return this.toDataFrame().getDummies()
    }

    oneHotEncode() {
      return this.getDummies()
    }
  }

  return Series
}

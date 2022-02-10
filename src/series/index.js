const assert = require("../assert.js")
const copy = require("../copy.js")
const isArray = require("../is-array.js")
const isNumber = require("../is-number.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const leftPad = require("../helpers/left-pad.js")
const ndarray = require("../ndarray.js")
const range = require("../range.js")
const reverse = require("../reverse.js")
const seriesApply = require("./series-apply.js")
const seriesDropMissing = require("./series-drop-missing.js")
const seriesFilter = require("./series-filter.js")
const seriesGetSubsetByIndices = require("./series-get-subset-by-indices.js")
const seriesPrint = require("./series-print.js")
const seriesSort = require("./series-sort.js")
const seriesSortByIndex = require("./series-sort-by-index.js")
const seriesToObject = require("./series-to-object.js")
const set = require("../set.js")
const shape = require("../shape.js")

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

  isEmpty() {
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

    if (isString(indices) || isNumber(indices)) indices = [indices]

    const types = set((indices || []).map(v => typeof v))

    assert(
      types.length <= 2,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    )

    if (types.length === 1) {
      assert(
        types[0] === "string" || types[0] === "number",
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )
    }

    if (types.length === 2) {
      assert(
        types.indexOf("string") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )

      assert(
        types.indexOf("number") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      )
    }

    if (!isUndefined(indices)) {
      indices = indices.map(i => {
        if (typeof i === "string") {
          assert(self.index.indexOf(i) > -1, `Index "${i}" does not exist!`)
          return i
        }

        if (typeof i === "number") {
          assert(i >= 0, `Index ${i} is out of bounds!`)
          assert(parseInt(i) === i, `Indices must be integers!`)
          assert(i < self.index.length, `Index ${i} is out of bounds!`)
          return self.index[i]
        }
      })
    }

    return self.getSubsetByNames(indices)
  }

  getSubsetByNames(indices) {
    const self = this

    if (isUndefined(indices)) indices = self.index

    assert(
      isArray(indices),
      "The `indices` array must be a 1-dimensional array of strings."
    )

    assert(
      shape(indices).length === 1,
      "The `indices` array must be a 1-dimensional array of strings."
    )

    assert(
      indices.length > 0,
      "The `indices` array must contain at least one index name."
    )

    indices.forEach(name => {
      assert(isString(name), "The `indices` array must contain only strings.")

      assert(
        self.index.indexOf(name) > -1,
        `The name "${name}" does not exist in the index.`
      )
    })

    const values = indices.map(name => {
      return self.values[self.index.indexOf(name)]
    })

    if (values.length === 1) return values[0]

    const out = new Series(values)
    out.index = indices
    out.name = self.name
    return out
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
}

module.exports = Series

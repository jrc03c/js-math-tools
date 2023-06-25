const { copy } = require("../copy")
const assert = require("../assert")
const count = require("../count")
const dfAppend = require("./df-append")
const dfApply = require("./df-apply")
const dfAssign = require("./df-assign")
const dfCopy = require("./df-copy")
const dfDrop = require("./df-drop")
const dfDropMissing = require("./df-drop-missing")
const dfDropNaN = require("./df-drop-nan")
const dfFilter = require("./df-filter")
const dfGet = require("./df-get")
const dfGetDummies = require("./df-get-dummies")
const dfGetSubsetByIndices = require("./df-get-subset-by-indices")
const dfGetSubsetByNames = require("./df-get-subset-by-names")
const dfPrint = require("./df-print")
const dfResetIndex = require("./df-reset-index")
const dfShuffle = require("./df-shuffle")
const dfSort = require("./df-sort")
const dfToJSON = require("./df-to-json")
const dfToJSONString = require("./df-to-json-string")
const dfToObject = require("./df-to-object")
const flatten = require("../flatten")
const isArray = require("../is-array")
const isObject = require("../is-object")
const isUndefined = require("../is-undefined")
const leftPad = require("../helpers/left-pad")
const ndarray = require("../ndarray")
const range = require("../range")
const shape = require("../shape")
const transpose = require("../transpose")

const DATAFRAME_SYMBOL = Symbol.for("@jrc03c/js-math-tools/dataframe")

function makeKey(n) {
  const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
  let out = ""
  for (let i = 0; i < n; i++)
    out += alpha[parseInt(Math.random() * alpha.length)]
  return out
}

class DataFrame {
  static [Symbol.hasInstance](x) {
    try {
      return !!x._symbol && x._symbol === DATAFRAME_SYMBOL
    } catch (e) {
      return false
    }
  }

  constructor(data) {
    const self = this

    Object.defineProperty(self, "_symbol", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: DATAFRAME_SYMBOL,
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
        if (
          self._values.length === 0 ||
          (!isUndefined(self._values[0]) && self._values[0].length === 0)
        ) {
          return [[]]
        }

        return self._values
      },

      set(x) {
        assert(isArray(x), "The new values must be a 2-dimensional array!")

        const dataShape = shape(x)

        assert(
          dataShape.length === 2,
          "The new array of values must be 2-dimensional!"
        )

        if (dataShape[0] < self._index.length) {
          self._index = self._index.slice(0, dataShape[0])
        } else if (dataShape[0] > self._index.length) {
          self._index = self._index.concat(
            range(self._index.length, dataShape[0]).map(i => {
              return "row" + leftPad(i, (dataShape[0] - 1).toString().length)
            })
          )
        }

        if (dataShape[1] < self._columns.length) {
          self._columns = self._columns.slice(0, dataShape[1])
        } else if (dataShape[1] > self._columns.length) {
          self._columns = self._columns.concat(
            range(self._columns.length, dataShape[1]).map(i => {
              return "col" + leftPad(i, (dataShape[1] - 1).toString().length)
            })
          )
        }

        self._values = x
      },
    })

    Object.defineProperty(self, "_columns", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(self, "columns", {
      configurable: true,
      enumerable: true,

      get() {
        return self._columns
      },

      set(x) {
        assert(
          isArray(x),
          "The new columns list must be a 1-dimensional array of strings!"
        )

        assert(
          self.isEmpty || x.length === self.shape[1],
          "The new columns list must be the same length as the old columns list!"
        )

        assert(
          shape(x).length === 1,
          "The new columns list must be a 1-dimensional array of strings!"
        )

        x = x.map(v => {
          if (typeof v !== "string") {
            v = JSON.stringify(v) || v.toString()
          }

          if (v.trim().length === 0) {
            return "untitled_" + makeKey(8)
          }

          return v.trim()
        })

        const counts = (() => {
          const temp = count(x)
          const out = {}

          temp.forEach(obj => {
            out[obj.value] = obj.count
          })

          return out
        })()

        x = x.map(v => {
          if (counts[v] > 1) {
            return v + "_" + makeKey(8)
          }

          return v
        })

        self._columns = x
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
          self.isEmpty || x.length === self.shape[0],
          "The new index must be the same length as the old index!"
        )

        assert(
          shape(x).length === 1,
          "The new index must be a 1-dimensional array of strings!"
        )

        x = x.map(v => {
          if (typeof v !== "string") {
            v = JSON.stringify(v) || v.toString()
          }

          if (v.trim().length === 0) {
            return "untitled_" + makeKey(8)
          }

          return v.trim()
        })

        const counts = (() => {
          const temp = count(x)
          const out = {}

          temp.forEach(obj => {
            out[obj.value] = obj.count
          })

          return out
        })()

        x = x.map(v => {
          if (counts[v] > 1) {
            return v + "_" + makeKey(8)
          }

          return v
        })

        self._index = x
      },
    })

    assert(
      isUndefined(data) || isObject(data) || isArray(data),
      "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."
    )

    if (data) {
      if (data instanceof DataFrame) {
        self.values = copy(data.values)
        self.columns = copy(data.columns)
        self.index = copy(data.index)
      } else if (isArray(data)) {
        const dataShape = shape(data)

        assert(
          dataShape.length === 2,
          "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"
        )

        self.values = data
      } else {
        self._columns = Object.keys(data)
          .concat(Object.getOwnPropertySymbols(data))
          .map(v => v.toString())

        const temp = []

        self._columns.forEach(col => {
          const values = data[col]
          temp.push(values)
        })

        self._values = transpose(temp)

        const dataShape = shape(self.values)

        self._index = range(0, dataShape[0]).map(i => {
          return "row" + leftPad(i, (dataShape[0] - 1).toString().length)
        })
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

  get width() {
    const self = this
    return self.shape[1]
  }

  get rows() {
    const self = this
    return self.index
  }

  set rows(rows) {
    const self = this
    self.index = rows
  }

  get isEmpty() {
    const self = this
    return flatten(self.values).length === 0
  }

  clear() {
    const self = this
    const out = new DataFrame(ndarray(self.shape))
    out.columns = self.columns.slice()
    out.index = self.index.slice()
    return out
  }

  get(rows, cols) {
    const self = this

    if (arguments.length === 0) {
      return self
    }

    if (arguments.length === 1) {
      try {
        return self.get(null, rows)
      } catch (e) {
        return self.get(rows, null)
      }
    }

    return dfGet(self, rows, cols)
  }

  getSubsetByNames(rows, cols) {
    const self = this
    return dfGetSubsetByNames(DataFrame, Series, self, rows, cols)
  }

  getSubsetByIndices(rowIndices, colIndices) {
    const self = this
    return dfGetSubsetByIndices(self, rowIndices, colIndices)
  }

  getDummies(columns) {
    const self = this
    return dfGetDummies(DataFrame, self, columns)
  }

  oneHotEncode(columns) {
    const self = this
    return dfGetDummies(DataFrame, self, columns)
  }

  transpose() {
    const self = this
    const out = new DataFrame(transpose(self.values))
    out.columns = self.index.slice()
    out.index = self.columns.slice()
    return out
  }

  get T() {
    const self = this
    return self.transpose()
  }

  resetIndex(shouldSkipCopying) {
    const self = this
    return dfResetIndex(self, shouldSkipCopying)
  }

  copy() {
    const self = this
    return dfCopy(DataFrame, self)
  }

  assign(p1, p2) {
    const self = this
    return dfAssign(DataFrame, Series, self, p1, p2)
  }

  apply(fn, axis) {
    const self = this
    return dfApply(DataFrame, Series, self, fn, axis)
  }

  dropMissing(axis, condition, threshold) {
    const self = this
    return dfDropMissing(DataFrame, Series, self, axis, condition, threshold)
  }

  dropNaN(axis, condition, threshold) {
    const self = this
    return dfDropNaN(DataFrame, self, axis, condition, threshold)
  }

  drop(rows, cols) {
    const self = this
    return dfDrop(DataFrame, Series, self, rows, cols)
  }

  dropColumns(columns) {
    const self = this
    return self.drop(null, columns)
  }

  dropRows(rows) {
    const self = this
    return self.drop(rows, null)
  }

  toObject(axis) {
    const self = this
    return dfToObject(self, axis)
  }

  toJSONString(axis) {
    const self = this
    return dfToJSONString(self, axis)
  }

  saveAsJSON(filename, axis) {
    const self = this
    return dfToJSON(self, filename, axis)
  }

  print() {
    const self = this
    return dfPrint(DataFrame, Series, self)
  }

  sort(cols, directions) {
    const self = this
    return dfSort(self, cols, directions)
  }

  sortByIndex() {
    const self = this
    return self.sort()
  }

  filter(fn, axis) {
    const self = this
    return dfFilter(DataFrame, Series, self, fn, axis)
  }

  shuffle(axis) {
    const self = this
    return dfShuffle(self, axis)
  }

  append(x, axis) {
    const self = this
    return dfAppend(self, x, axis)
  }

  concat(x, axis) {
    const self = this
    return self.append(x, axis)
  }

  join(x, axis) {
    const self = this
    return self.append(x, axis)
  }

  toString() {
    const self = this
    return JSON.stringify(self)
  }
}

const Series = require("../series")(DataFrame)
module.exports = { DataFrame, Series }

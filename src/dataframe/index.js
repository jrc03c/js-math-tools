const { random } = require("../random.js")
const apply = require("../apply.js")
const assert = require("../assert.js")
const copy = require("../copy.js")
const count = require("../count.js")
const dropNaN = require("../drop-nan.js")
const flatten = require("../flatten.js")
const isArray = require("../is-array.js")
const isBoolean = require("../is-boolean.js")
const isEqual = require("../is-equal.js")
const isFunction = require("../is-function.js")
const isNumber = require("../is-number.js")
const isString = require("../is-string.js")
const isUndefined = require("../is-undefined.js")
const max = require("../max.js")
const min = require("../min.js")
const ndarray = require("../ndarray.js")
const range = require("../range.js")
const Series = require("../series")
const set = require("../set.js")
const shape = require("../shape.js")
const sort = require("../sort.js")
const transpose = require("../transpose.js")
const leftPad = require("./left-pad.js")
const dfToCSV = require("./df-to-csv.js")
const dfToCSVString = require("./df-to-csv-string.js")
const dfFromCSV = require("./df-from-csv.js")
const dfFromCSVString = require("./df-from-csv-string.js")
const dfShuffle = require("./df-shuffle.js")
const dfFilter = require("./df-filter.js")
const dfSort = require("./df-sort.js")
const dfPrint = require("./df-print.js")
const dfToObject = require("./df-to-object.js")
const dfDrop = require("./df-drop.js")
const isSeries = require("./is-series.js")
const dfDropNaN = require("./df-drop-nan.js")
const isWholeNumber = require("./is-whole-number.js")
const dfDropMissing = require("./df-drop-missing.js")

function makeKey(n) {
  const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
  let out = ""
  for (let i = 0; i < n; i++)
    out += alpha[parseInt(Math.random() * alpha.length)]
  return out
}

function isObject(x) {
  return x instanceof Object && !isArray(x)
}

function isDataFrame(x) {
  return x instanceof DataFrame
}

function quote(s) {
  let pattern = /"(.*?)"/g
  let matches = s.match(pattern)
  let out = s.slice()

  if (matches) {
    matches.forEach(item => {
      out = out.replace(item, `“${item.substring(1, item.length - 1)}”`)
    })
  }

  pattern = /'(.*?)'/g
  matches = s.match(pattern)

  if (matches) {
    matches.forEach(item => {
      out = out.replace(item, `‘${item.substring(1, item.length - 1)}’`)
    })
  }

  return `"${out}"`
}

class DataFrame {
  constructor(data) {
    const self = this

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
          x.length === self.shape[1],
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
            out[obj.item] = obj.count
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
          x.length === self.shape[0],
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
            out[obj.item] = obj.count
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
      isUndefined(data) || data instanceof Object,
      "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."
    )

    if (data) {
      if (isArray(data)) {
        const dataShape = shape(data)

        assert(
          dataShape.length === 2,
          "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"
        )

        self.values = data
      } else {
        self._columns = Object.keys(data)
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

  get rows() {
    const self = this
    return self.index
  }

  set rows(rows) {
    const self = this
    self.index = rows
  }

  isEmpty() {
    const self = this
    return set(self.values).filter(v => !isUndefined(v)).length === 0
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

    if (isString(rows) || isNumber(rows)) rows = [rows]
    if (isString(cols) || isNumber(cols)) cols = [cols]

    const types = set((rows || []).concat(cols || []).map(v => typeof v))

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

    if (!isUndefined(rows)) {
      rows = rows.map(r => {
        if (typeof r === "string") {
          assert(self.index.indexOf(r) > -1, `Row "${r}" does not exist!`)
          return r
        }

        if (typeof r === "number") {
          assert(r >= 0, `Index ${r} is out of bounds!`)
          assert(parseInt(r) === r, `Row numbers must be integers!`)
          assert(r < self.index.length, `Index ${r} is out of bounds!`)
          return self.index[r]
        }
      })
    }

    if (!isUndefined(cols)) {
      cols = cols.map(c => {
        if (typeof c === "string") {
          assert(self.columns.indexOf(c) > -1, `Column "${c}" does not exist!`)
          return c
        }

        if (typeof c === "number") {
          assert(c >= 0, `Column ${c} is out of bounds!`)
          assert(parseInt(c) === c, `Column numbers must be integers!`)
          assert(c < self.columns.length, `Column ${c} is out of bounds!`)
          return self.columns[c]
        }
      })
    }

    return self.getSubsetByNames(rows, cols)
  }

  getSubsetByNames(rows, cols) {
    const self = this

    if (isUndefined(rows)) rows = self.index
    if (isUndefined(cols)) cols = self.columns
    if (typeof rows === "string") rows = [rows]
    if (typeof cols === "string") cols = [cols]

    assert(
      isArray(rows) && isArray(cols),
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
    )

    assert(
      shape(rows).length === 1 && shape(cols).length === 1,
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
    )

    assert(
      rows.length > 0,
      "The `rows` array must contain at least one row name."
    )

    assert(
      cols.length > 0,
      "The `cols` array must contain at least one column name."
    )

    rows.forEach(row => {
      assert(
        isString(row),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      )

      assert(
        self.index.indexOf(row) > -1,
        `The row name "${row}" does not exist in the list of rows.`
      )
    })

    cols.forEach(col => {
      assert(
        isString(col),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      )

      assert(
        self.columns.indexOf(col) > -1,
        `The column name "${col}" does not exist in the list of columns.`
      )
    })

    const values = rows.map(row => {
      return cols.map(col => {
        return self.values[self.index.indexOf(row)][self.columns.indexOf(col)]
      })
    })

    if (rows.length === 1 && cols.length === 1) {
      return flatten(values)[0]
    }

    if (rows.length === 1) {
      const out = new Series(flatten(values))
      out.name = rows[0]
      out.index = cols
      return out
    }

    if (cols.length === 1) {
      const out = new Series(flatten(values))
      out.name = cols[0]
      out.index = rows
      return out
    }

    const out = new DataFrame(values)
    out.columns = cols
    out.index = rows
    return out
  }

  getSubsetByIndices(rowIndices, colIndices) {
    const self = this
    const dataShape = self.shape

    if (isUndefined(rowIndices)) rowIndices = range(0, dataShape[0])
    if (isUndefined(colIndices)) colIndices = range(0, dataShape[1])
    if (typeof rowIndices === "number") rowIndices = [rowIndices]
    if (typeof colIndices === "number") colIndices = [colIndices]

    assert(
      isArray(rowIndices) && isArray(colIndices),
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    )

    assert(
      shape(rowIndices).length === 1 && shape(colIndices).length === 1,
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    )

    assert(
      rowIndices.length > 0,
      "The `rowIndices` array must contain at least one index."
    )

    assert(
      colIndices.length > 0,
      "The `colIndices` array must contain at least one index."
    )

    rowIndices.forEach(rowIndex => {
      assert(
        isWholeNumber(rowIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      )

      assert(
        rowIndex < self.index.length,
        `The row index ${rowIndex} is out of bounds.`
      )
    })

    colIndices.forEach(colIndex => {
      assert(
        isWholeNumber(colIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      )

      assert(
        colIndex < self.columns.length,
        `The column index ${colIndex} is out of bounds.`
      )
    })

    const rows = rowIndices.map(i => self.index[i])
    const cols = colIndices.map(i => self.columns[i])
    return self.getSubsetByNames(rows, cols)
  }

  loc(rows, cols) {
    const self = this
    return self.getSubsetByNames(rows, cols)
  }

  iloc(rowIndices, colIndices) {
    const self = this
    return self.getSubsetByIndices(rowIndices, colIndices)
  }

  transpose() {
    const self = this
    const out = new DataFrame(transpose(self.values))
    out.columns = self.index
    out.index = self.columns
    return out
  }

  get T() {
    const self = this
    return self.transpose()
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
    if (self.isEmpty()) return new DataFrame()
    const out = new DataFrame(copy(self.values))
    out.columns = self.columns.slice()
    out.index = self.index.slice()
    return out
  }

  assign(p1, p2) {
    let name, obj

    if (isUndefined(p2)) {
      obj = p1

      assert(
        !isArray(obj),
        "When using only one parameter for the `assign` method, the parameter must be an object or a Series."
      )
    } else {
      name = p1
      obj = p2

      assert(
        isString(name),
        "When using two parameters for the `assign` method, the first parameter must be a string."
      )

      assert(
        isSeries(obj) || (isArray(obj) && shape(obj).length === 1),
        "When using two parameters for the `assign` method, the second parameter must be a Series or a 1-dimensional array."
      )
    }

    assert(
      isObject(obj) ||
        isSeries(obj) ||
        (isArray(obj) && shape(obj).length === 1),
      "An object, Series, or 1-dimensional array must be passed into the `assign` method."
    )

    const self = this

    if (isSeries(obj)) {
      const temp = {}

      assert(
        self.isEmpty() || isEqual(obj.index, self.index),
        "The index of the new data does not match the index of the DataFrame."
      )

      temp[name || obj.name] = obj.values
      return self.assign(temp)
    } else if (isArray(obj)) {
      const temp = {}
      temp[name || "data"] = obj
      return self.assign(temp)
    } else {
      let out = self.copy()
      let outShape = out.shape

      Object.keys(obj).forEach(col => {
        const values = obj[col]

        assert(
          isArray(values),
          "Each key-value pair must be (respectively) a string and a 1-dimensional array of values."
        )

        assert(
          shape(values).length === 1,
          "Each key-value pair must be (respectively) a string and a 1-dimensional array of values."
        )

        if (out.isEmpty()) {
          out.values = transpose([values])
          out.columns = [col]
          outShape = out.shape
        } else {
          assert(
            values.length === outShape[0],
            `Column "${col}" in the new data is not the same length as the other columns in the original DataFrame.`
          )

          let colIndex = out.columns.indexOf(col)

          if (colIndex < 0) {
            out.columns.push(col)
            colIndex = out.columns.indexOf(col)
          }

          out.values.forEach((row, i) => {
            row[colIndex] = values[i]
          })
        }
      })

      return out
    }
  }

  apply(fn, axis) {
    axis = axis || 0

    assert(
      isFunction(fn),
      "The first parameter to the `apply` method must be a function."
    )

    assert(
      axis === 0 || axis === 1,
      "The second parameter to the `apply` method (the `axis`) must be 0 or 1."
    )

    const self = this

    if (axis === 0) {
      const temp = transpose(self.values)

      const newValues = temp.map((col, i) => {
        const series = new Series(col)
        series.name = self.columns[i]
        series.index = self.index
        return fn(series, i, self)
      })

      if (shape(newValues).length === 1) {
        const out = new Series(newValues)
        out.index = copy(self.columns)
        return out
      } else {
        const out = new DataFrame(transpose(newValues))
        out.index = copy(self.index)
        out.columns = copy(self.columns)
        return out
      }
    } else if (axis === 1) {
      const newValues = self.values.map((row, i) => {
        const series = new Series(row)
        series.name = self.index[i]
        series.index = self.columns
        return fn(series, i, self)
      })

      if (shape(newValues).length === 1) {
        const out = new Series(newValues)
        out.index = copy(self.index)
        return out
      } else {
        const out = new DataFrame(newValues)
        out.index = copy(self.index)
        out.columns = copy(self.columns)
        return out
      }
    }
  }

  map(fn, axis) {
    const self = this
    return self.apply(fn, axis)
  }

  dropMissing(axis, condition, threshold) {
    const self = this
    return dfDropMissing(DataFrame, self, axis, condition, threshold)
  }

  dropNaN(axis, condition, threshold) {
    const self = this
    return dfDropNaN(DataFrame, self, axis, condition, threshold)
  }

  drop(rows, cols) {
    const self = this
    return dfDrop(DataFrame, self, rows, cols)
  }

  dropColumns(columns) {
    const self = this
    return self.drop(null, columns)
  }

  dropRows(rows) {
    const self = this
    return self.drop(rows, null)
  }

  toObject() {
    const self = this
    return dfToObject(self)
  }

  toCSVString(shouldIncludeIndex) {
    const self = this
    return dfToCSVString(self, shouldIncludeIndex)
  }

  toCSV(filename, shouldIncludeIndex) {
    const self = this
    return dfToCSV(self, filename, shouldIncludeIndex)
  }

  print() {
    const self = this
    return dfPrint(DataFrame, self)
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
    return dfFilter(DataFrame, self, fn, axis)
  }

  shuffle(axis) {
    const self = this
    return dfShuffle(self, axis)
  }
}

DataFrame.fromCSV = function () {
  return dfFromCSV(DataFrame, ...arguments)
}

DataFrame.fromCSVString = function () {
  return dfFromCSVString(DataFrame, ...arguments)
}

module.exports = DataFrame

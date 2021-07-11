const assert = require("./assert.js")
const isArray = require("./is-array.js")
const isUndefined = require("./is-undefined.js")
const shape = require("./shape.js")
const transpose = require("./transpose.js")
const range = require("./range.js")
const isNumber = require("./is-number.js")
const isString = require("./is-string.js")
const apply = require("./apply.js")
const isFunction = require("./is-function.js")
const ndarray = require("./ndarray.js")
const copy = require("./copy.js")
const Series = require("./series.js")
const flatten = require("./flatten.js")
const isEqual = require("./is-equal.js")
const max = require("./max.js")
const min = require("./min.js")
const set = require("./set.js")
const isBoolean = require("./is-boolean.js")
const random = require("./random.js")
const sort = require("./sort.js")
const dropNaN = require("./drop-nan.js")

function makeKey(n) {
  const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
  let out = ""
  for (let i = 0; i < n; i++)
    out += alpha[parseInt(Math.random() * alpha.length)]
  return out
}

function isInteger(x) {
  return isNumber(x) && parseInt(x) === x
}

function isWholeNumber(x) {
  return isInteger(x) && x >= 0
}

function isObject(x) {
  return x instanceof Object && !isArray(x)
}

function isDataFrame(x) {
  return x instanceof DataFrame
}

function isSeries(x) {
  return x instanceof Series
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

function leftPad(x, maxLength) {
  assert(isNumber(x), "The `leftPad` function only works on numbers!")
  let out = x.toString()
  while (out.length < maxLength) out = "0" + out
  return out
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
          if (typeof v === "string") return v
          return JSON.stringify(v) || v.toString()
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
          if (typeof v === "string") return v
          return JSON.stringify(v) || v.toString()
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

  static async fromCSV(path, options) {
    options = options || {}
    let raw

    // browser
    try {
      const response = await fetch(path)
      raw = await response.text()
    } catch (e) {}

    // node
    try {
      const fs = require("fs")
      const encoding = options.encoding || "utf8"
      raw = fs.readFileSync(path, encoding)
    } catch (e) {}

    const lines = raw.split("\n").filter(line => line.length > 0)

    let out = lines.map(line => {
      const dict = {}
      const quotePattern = /"(.*?)"/g
      const matches = line.match(quotePattern) || []

      matches.forEach(match => {
        const key = makeKey(32)
        line = line.replaceAll(match, key)
        dict[key] = match
      })

      const values = line.split(",")

      return values.map((value, i) => {
        value = dict[value] || value

        try {
          let parsedValue = JSON.parse(value)
          if (isArray(parsedValue)) return value
          return parsedValue
        } catch (e) {
          return value
        }
      })
    })

    const valuesPerRow = max(out.map(line => line.length))

    out = out.map(line => {
      line.length = valuesPerRow
      return line
    })

    let columns, index
    const hasHeaderRow = isBoolean(options.hasHeaderRow)
      ? options.hasHeaderRow
      : true
    const hasIndexColumn = isBoolean(options.hasIndexColumn)
      ? options.hasIndexColumn
      : false

    if (hasHeaderRow) {
      columns = out.shift()
    }

    if (hasIndexColumn) {
      index = out.map(row => row.shift())
      if (columns) columns.shift()
    }

    out = new DataFrame(out)
    if (columns) out.columns = columns
    if (index) out.index = index
    return out
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
        return fn(col, self.columns[i])
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
        return fn(row, self.index[i])
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
    axis = axis || 0

    assert(
      axis === 0 || axis === 1,
      "The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1."
    )

    threshold = threshold || 0

    assert(
      isWholeNumber(threshold),
      "The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values)."
    )

    condition = threshold > 0 ? "none" : condition || "any"

    assert(
      condition === "any" || condition === "all" || condition === "none",
      "The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped)."
    )

    function helper(values) {
      if (threshold > 0) {
        let count = 0

        for (let i = 0; i < values.length; i++) {
          const value = values[i]
          if (isUndefined(value)) count++
          if (count >= threshold) return []
        }
      } else if (condition === "any") {
        for (let i = 0; i < values.length; i++) {
          const value = values[i]
          if (isUndefined(value)) return []
        }
      } else if (condition === "all") {
        for (let i = 0; i < values.length; i++) {
          const value = values[i]
          if (!isUndefined(value)) return values
        }

        return []
      }

      return values
    }

    const self = this
    let out = self.copy()
    const tempID = Math.random().toString()

    if (axis === 0) {
      out = out.assign(tempID, out.index)

      const newValues = out.values.map(helper).filter(row => row.length > 0)

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues

      let newIndex = out.get(null, tempID)
      if (isUndefined(newIndex)) return new DataFrame()
      if (isString(newIndex)) newIndex = [newIndex]
      if (isSeries(newIndex)) newIndex = newIndex.values
      out.index = newIndex
      out = out.drop(null, tempID)
    } else if (axis === 1) {
      out = out.transpose()
      out = out.assign(tempID, out.index)

      const newValues = out.values.map(helper).filter(col => col.length > 0)

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues

      let newIndex = out.get(null, tempID)
      if (isUndefined(newIndex)) return new DataFrame()
      if (isString(newIndex)) newIndex = [newIndex]
      if (isSeries(newIndex)) newIndex = newIndex.values
      out.index = newIndex
      out = out.drop(null, tempID)
      out = out.transpose()
    }

    return out
  }

  dropNaN(axis, condition, threshold) {
    axis = axis || 0

    assert(
      axis === 0 || axis === 1,
      "The first parameter of the `dropNaN` method (the `axis`) must be 0 or 1."
    )

    threshold = threshold || 0

    assert(
      isWholeNumber(threshold),
      "The third parameter of the `dropNaN` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` NaN values)."
    )

    condition = threshold > 0 ? "none" : condition || "any"

    assert(
      condition === "any" || condition === "all" || condition === "none",
      "The second parameter of the `dropNaN` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains NaN values, then it should be dropped; or that if 'all' of the data contains NaN values, then it should be dropped)."
    )

    function helper(values) {
      const numericalValues = dropNaN(values)
      if (threshold > 0)
        return values.length - numericalValues.length < threshold
      if (condition === "any") return numericalValues.length === values.length
      if (condition === "all") return numericalValues.length > 0
      return true
    }

    const self = this
    let out = self.copy()
    const tempID = Math.random().toString()

    if (axis === 0) {
      const rowsToKeep = out.index.filter(row => {
        const values = out.get(row, null).values
        return helper(values)
      })

      if (rowsToKeep.length > 0) return out.get(rowsToKeep, null)
      else return new DataFrame()
    } else if (axis === 1) {
      const colsToKeep = out.columns.filter(col => {
        const values = out.get(null, col).values
        return helper(values)
      })

      if (colsToKeep.length > 0) return out.get(null, colsToKeep)
      else return new DataFrame()
    }

    return out
  }

  drop(rows, cols) {
    const self = this

    if (isUndefined(rows)) rows = []
    if (isUndefined(cols)) cols = []
    if (isString(rows) || isNumber(rows)) rows = [rows]
    if (isString(cols) || isNumber(cols)) cols = [cols]

    assert(
      isArray(rows),
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    )

    assert(
      isArray(cols),
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    )

    assert(
      shape(rows).length === 1,
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    )

    assert(
      shape(cols).length === 1,
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    )

    let outIndex, outColumns

    self.index.forEach((row, i) => {
      if (rows.indexOf(row) < 0 && rows.indexOf(i) < 0) {
        if (!outIndex) outIndex = []
        outIndex.push(row)
      }
    })

    self.columns.forEach((col, i) => {
      if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0) {
        if (!outColumns) outColumns = []
        outColumns.push(col)
      }
    })

    let out = self.get(outIndex, outColumns)

    if (isSeries(out)) {
      let temp = new DataFrame()
      temp = temp.assign(out)
      if (self.index.indexOf(out.name) > -1) temp = temp.transpose()
      out = temp
    }

    return out
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
    const out = {}

    self.values.forEach((row, i) => {
      const temp = {}

      row.forEach((value, j) => {
        temp[self.columns[j]] = value
      })

      out[self.index[i]] = temp
    })

    return out
  }

  toCSVString(options) {
    const self = this
    options = isUndefined(options) ? {} : options

    const hasHeaderRow = isBoolean(options.hasHeaderRow)
      ? options.hasHeaderRow
      : true
    const hasIndexColumn = isBoolean(options.hasIndexColumn)
      ? options.hasIndexColumn
      : false

    let index, columns, out

    if (hasHeaderRow && hasIndexColumn) {
      index = ["(index)"].concat(copy(self.index))
      columns = copy(self.columns)

      out = [columns].concat(self.values).map((row, i) => {
        return [index[i]].concat(row)
      })
    } else if (!hasHeaderRow && hasIndexColumn) {
      index = copy(self.index)

      out = self.values.map((row, i) => {
        return [index[i]].concat(row)
      })
    } else if (hasHeaderRow && !hasIndexColumn) {
      columns = copy(self.columns)
      out = [columns].concat(self.values)
    } else if (!hasHeaderRow && !hasIndexColumn) {
      out = self.values
    }

    out = out
      .map((row, i) => {
        return row
          .map(value => {
            if (isString(value)) {
              return quote(value)
            } else {
              return value
            }
          })
          .join(",")
      })
      .join("\n")

    return out
  }

  toCSV(filename, options) {
    const self = this
    const out = self.toCSVString(options)

    // browser
    try {
      if (filename.includes("/")) {
        const parts = filename.split("/")
        const newFilename = parts[parts.length - 1]
      } else {
        const newFilename = filename
      }

      const a = document.createElement("a")
      a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(out)}`
      a.download = newFilename
      a.dispatchEvent(new MouseEvent("click"))
    } catch (e) {}

    // node
    try {
      const fs = require("fs")
      const path = require("path")
      fs.writeFileSync(path.resolve(filename), out, "utf8")
    } catch (e) {}

    return self
  }

  print() {
    const self = this

    if (isEqual(self.shape, [0])) {
      console.table({})
      return self
    }

    const maxRows = typeof window === "undefined" ? 20 : 10
    const halfMaxRows = parseInt(maxRows / 2)
    const maxColumns =
      typeof window === "undefined"
        ? Math.floor(process.stdout.columns / 24) - 1
        : 10
    const halfMaxColumns = parseInt(maxColumns / 2)

    const tempRows =
      maxRows > self.index.length
        ? null
        : range(0, halfMaxRows).concat(
            range(self.index.length - halfMaxRows, self.index.length)
          )

    const tempColumns =
      maxColumns > self.columns.length
        ? null
        : range(0, halfMaxColumns).concat(
            range(self.columns.length - halfMaxColumns, self.columns.length)
          )

    let temp = self.get(tempRows, tempColumns)

    if (temp instanceof Series) {
      if (self.shape[0] === 1) {
        // data is row-shaped
        temp = new DataFrame([temp.values])
        temp.index = self.index
        temp.columns = new Series(self.columns).get(tempColumns).values
      } else if (self.shape[1] === 1) {
        // data is column-shaped
        temp = new DataFrame([temp.values]).transpose()
        temp.index = new Series(self.index).get(tempRows).values
        temp.columns = self.columns
      }
    }

    if (maxRows <= self.index.length) {
      temp._index.splice(halfMaxRows, 0, "...")
      temp._values.splice(
        halfMaxRows,
        0,
        range(0, temp.columns.length).map(i => "...")
      )
    }

    if (maxColumns <= self.columns.length) {
      temp._columns.splice(halfMaxColumns, 0, "...")

      temp._values = temp._values.map(row => {
        row.splice(halfMaxColumns, 0, "...")
        return row
      })
    }

    console.table(temp.toObject())
    return self
  }

  sort(cols, directions) {
    const self = this

    // temporarily assign index as column in dataframe
    let out = self.copy()
    const indexID = random().toString()
    out = out.assign(indexID, out.index)

    if (isUndefined(cols)) {
      cols = [indexID]
      directions = [true]
    }

    if (isNumber(cols) || isString(cols)) {
      cols = [cols]

      if (isBoolean(directions) || isString(directions))
        directions = [directions]
    }

    assert(
      isArray(cols),
      "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
    )

    assert(
      shape(cols).length === 1,
      "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
    )

    if (isUndefined(directions))
      directions = range(0, cols.length).map(i => true)

    assert(
      isArray(directions),
      "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
    )

    assert(
      shape(directions).length === 1,
      "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
    )

    assert(
      cols.length === directions.length,
      "The arrays passed into the `sort` method must be equal in length."
    )

    // convert all columns to indices
    cols = cols.map(col => {
      assert(
        isString(col) || isNumber(col),
        "Column references can either be column names (as strings) or column indices (as whole numbers)."
      )

      if (isString(col)) {
        const index = out.columns.indexOf(col)
        assert(index > -1, `The column "${col}" does not exist!`)
        return index
      }

      if (isNumber(col)) {
        assert(parseInt(col) === col, "Column indices must be whole numbers!")
        assert(col >= 0, `The column index ${col} is out of bounds!`)
        assert(col < out.columns.length, `The index ${col} is out of bounds!`)
        return col
      }
    })

    // convert all directions to booleans
    directions = directions.map(dir => {
      assert(
        isString(dir) || isBoolean(dir),
        "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
      )

      if (isString(dir)) {
        const value = dir.trim().toLowerCase()

        assert(
          value === "ascending" || value === "descending",
          "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
        )

        return value === "ascending"
      }

      if (isBoolean(dir)) {
        return dir
      }
    })

    // sort
    out.values = sort(out.values, (a, b) => {
      let counter = 0

      while (a[cols[counter]] === b[cols[counter]] && counter < cols.length) {
        counter++
      }

      const isAscending = directions[counter]
      if (a[cols[counter]] === b[cols[counter]]) return 0
      if (a[cols[counter]] < b[cols[counter]]) return isAscending ? -1 : 1
      if (a[cols[counter]] > b[cols[counter]]) return isAscending ? 1 : -1
    })

    out.index = flatten(out.get(null, indexID).values)
    out = out.dropColumns(indexID)
    return out
  }

  sortByIndex() {
    const self = this
    return self.sort()
  }

  filter(fn, axis) {
    assert(
      isFunction(fn),
      "The `filter` method takes a single parameter: a function that is used to filter the values."
    )

    if (isUndefined(axis)) axis = 0

    assert(
      axis === 0 || axis === 1,
      "The `axis` parameter to the `filter` method must be 0 or 1."
    )

    const self = this
    let out = self.copy()
    if (out.isEmpty()) return out

    const index = copy(out.index)
    const columns = copy(out.columns)

    if (axis === 0) {
      const indexID = Math.random().toString()
      out = out.assign(indexID, out.index)

      let newValues = out.values.filter((row, i) => {
        const shouldKeep = fn(row, i, out)
        if (!shouldKeep) index.splice(i, 1)
        return shouldKeep
      })

      if (flatten(newValues).length === 0) return new DataFrame()
      if (shape(newValues).length === 1) newValues = [newValues]

      out.values = newValues
      out.index = out.get(null, indexID).values
      out = out.drop(null, indexID)
    } else if (axis === 1) {
      out = out.transpose()

      const columnsID = Math.random().toString()
      out = out.assign(columnsID, out.index)

      let newValues = out.values.filter((row, i) => {
        const shouldKeep = fn(row, i, out)
        if (!shouldKeep) columns.splice(i, 1)
        return shouldKeep
      })

      if (flatten(newValues).length === 0) return new DataFrame()
      if (shape(newValues).length === 1) newValues = [newValues]

      out.values = newValues
      out.index = out.get(null, columnsID).values
      out = out.drop(null, columnsID)
      out = out.transpose()
    }

    return out
  }

  shuffle(axis) {
    if (isUndefined(axis)) axis = 0

    assert(
      axis === 0 || axis === 1,
      "The `axis` parameter to the `shuffle` must be 0, 1, or undefined."
    )

    const self = this

    return self.get(
      axis === 0 ? shuffle(self.index) : null,
      axis === 1 ? shuffle(self.columns) : null
    )
  }
}

module.exports = DataFrame

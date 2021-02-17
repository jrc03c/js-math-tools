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
let Series = require("./series.js")
let flatten = require("../flatten.js")
let isEqual = require("../is-equal.js")
let max = require("../max.js")
let min = require("../min.js")

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

class DataFrame {
  constructor(data){
    let self = this

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
        assert(isArray(x), "The new values must be a 2-dimensional array!")

        let dataShape = shape(x)
        assert(dataShape.length === 2, "The new array of values must be 2-dimensional!")

        if (dataShape[0] < self._index.length){
          self._index = self._index.slice(0, dataShape[0])
        } else if (dataShape[0] > self._index.length){
          self._index = self._index.concat(range(self._index.length, dataShape[0]).map(i => "row" + i))
        }

        if (dataShape[1] < self._columns.length){
          self._columns = self._columns.slice(0, dataShape[1])
        } else if (dataShape[1] > self._columns.length){
          self._columns = self._columns.concat(range(self._columns.length, dataShape[1]).map(i => "col" + i))
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

      get(){
        return self._columns
      },

      set(x){
        assert(isArray(x), "The new columns list must be a 1-dimensional array of strings!")
        assert(x.length === self.shape[1], "The new columns list must be the same length as the old columns list!")
        assert(shape(x).length === 1, "The new columns list must be a 1-dimensional array of strings!")

        x.forEach(value => {
          assert(isString(value), "All of the column names must be strings!")
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

    assert(isUndefined(data) || data instanceof Object, "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values.")

    if (data){
      if (isArray(data)){
        let dataShape = shape(data)
        assert(dataShape.length === 2, "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!")
        self.values = data
      } else {
        self._columns = Object.keys(data)
        let temp = []

        self._columns.forEach(col => {
          let values = data[col]
          temp.push(values)
        })

        self._values = transpose(temp)

        let dataShape = shape(self.values)
        self._index = range(0, dataShape[0]).map(i => "row" + i)
      }
    }
  }

  get shape(){
    let self = this
    return shape(self.values)
  }

  get rows(){
    let self = this
    return self.index
  }

  set rows(rows){
    let self = this
    self.index = rows
  }

  isEmpty(){
    let self = this
    return self.shape.length < 2
  }

  clear(){
    let self = this
    let out = self.copy()
    out.values = ndarray(out.shape)
    out.index = self.index
    out.columns = self.columns
    return out
  }

  getSubsetByNames(rows, cols){
    let self = this

    if (isUndefined(rows)) rows = self.index
    if (isUndefined(cols)) cols = self.columns

    assert(isArray(rows) && isArray(cols), "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.")
    assert(shape(rows).length === 1 && shape(cols).length === 1, "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.")
    assert(rows.length > 0, "The `rows` array must contain at least one row name.")
    assert(cols.length > 0, "The `cols` array must contain at least one column name.")

    rows.forEach(row => {
      assert(isString(row), "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.")
      assert(self.index.indexOf(row) > -1, `The row name "${row}" does not exist in the list of rows.`)
    })

    cols.forEach(col => {
      assert(isString(col), "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.")
      assert(self.columns.indexOf(col) > -1, `The column name "${col}" does not exist in the list of columns.`)
    })

    let values = rows.map(row => {
      return cols.map(col => {
        return self.values[self.index.indexOf(row)][self.columns.indexOf(col)]
      })
    })

    let valuesShape = shape(values)

    if (valuesShape.indexOf(1) > -1){
      let out = new Series(flatten(values))

      if (valuesShape[0] === 1){
        out.name = rows[0]
        out.index = self.columns
        return out
      } else if (valuesShape[1] === 1){
        out.name = cols[0]
        out.index = self.index
        return out
      }
    }

    let out = new DataFrame(values)
    out.columns = cols
    out.index = rows
    return out
  }

  getSubsetByIndices(rowIndices, colIndices){
    let self = this
    let dataShape = self.shape

    if (isUndefined(rowIndices)) rowIndices = range(0, dataShape[0])
    if (isUndefined(colIndices)) colIndices = range(0, dataShape[1])

    assert(isArray(rowIndices) && isArray(colIndices), "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.")
    assert(shape(rowIndices).length === 1 && shape(colIndices).length === 1, "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.")
    assert(rowIndices.length > 0, "The `rowIndices` array must contain at least one index.")
    assert(colIndices.length > 0, "The `colIndices` array must contain at least one index.")

    rowIndices.forEach(rowIndex => {
      assert(isWholeNumber(rowIndex), "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.")
      assert(rowIndex < self.index.length, `The row index ${rowIndex} is out of bounds.`)
    })

    colIndices.forEach(colIndex => {
      assert(isWholeNumber(colIndex), "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.")
      assert(colIndex < self.columns.length, `The column index ${colIndex} is out of bounds.`)
    })

    let rows = rowIndices.map(i => self.index[i])
    let cols = colIndices.map(i => self.columns[i])
    return self.getSubsetByNames(rows, cols)
  }

  loc(rows, cols){
    let self = this
    return self.getSubsetByNames(rows, cols)
  }

  iloc(rowIndices, colIndices){
    let self = this
    return self.getSubsetByIndices(rowIndices, colIndices)
  }

  transpose(){
    let self = this
    let out = new DataFrame(transpose(self.values))
    out.columns = self.index
    out.index = self.columns
    return out
  }

  get T(){
    let self = this
    return self.transpose()
  }

  resetIndex(){
    let self = this
    let out = self.copy()
    out.index = range(0, self.shape[0]).map(i => "row" + i)
    return out
  }

  copy(){
    let self = this
    if (self.isEmpty()) return new DataFrame()
    let out = new DataFrame(copy(self.values))
    out.columns = self.columns.slice()
    out.index = self.index.slice()
    return out
  }

  assign(obj){
    assert(isObject(obj) || isSeries(obj), "An object or Series must be passed into the `assign` method.")

    let self = this

    if (isSeries(obj)){
      let temp = {}
      assert (isEqual(obj.index, self.index), "The index of the new data does not match the index of the DataFrame.")
      temp[obj.name] = obj.values
      return self.assign(temp)
    } else {
      let out = self.copy()
      let outShape = out.shape

      Object.keys(obj).forEach(col => {
        let values = obj[col]

        assert(isArray(values), "Each key-value pair must be (respectively) a string and a 1-dimensional array of values.")
        assert(shape(values).length === 1, "Each key-value pair must be (respectively) a string and a 1-dimensional array of values.")

        if (out.isEmpty()){
          out.values = transpose([values])
          out.columns = [col]
          outShape = out.shape
        } else {
          assert(values.length === outShape[0], `Column "${col}" in the new data is not the same length as the other columns in the original DataFrame.`)

          let colIndex = out.columns.indexOf(col)

          if (colIndex < 0){
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

  apply(fn, axis){
    axis = axis || 0

    assert(isFunction(fn), "The first parameter to the `apply` method must be a function.")
    assert(axis === 0 || axis === 1, "The second parameter to the `apply` method (the `axis`) must be 0 or 1.")

    let self = this
    let out = self.copy()

    if (axis === 0){
      out = out.transpose()

      out.values = out.values.map((col, i) => {
        return fn(out.index[i], col)
      })

      out = out.transpose()
    } else if (axis === 1){
      out.values = out.values.map((row, i) => {
        return fn(out.index[i], row)
      })
    }

    return out
  }

  dropMissing(axis, condition, threshold){
    axis = axis || 0
    assert(axis === 0 || axis === 1, "The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1.")

    threshold = threshold || 0
    assert(isWholeNumber(threshold), "The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values).")

    condition = threshold > 0 ? "none" : (condition || "any")
    assert(condition === "any" || condition === "all" || condition === "none", "The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped).")

    function helper(values){
      if (threshold > 0){
        let count = 0

        for (let i=0; i<values.length; i++){
          let value = values[i]
          if (isUndefined(value)) count++
          if (count >= threshold) return []
        }
      } else if (condition === "any"){
        for (let i=0; i<values.length; i++){
          let value = values[i]
          if (isUndefined(value)) return []
        }
      } else if (condition === "all"){
        for (let i=0; i<values.length; i++){
          let value = values[i]
          if (!isUndefined(value)) return values
        }

        return []
      }

      return values
    }

    let self = this
    let out = self.copy()

    if (axis === 0){
      let newValues = out.values.map(helper).filter((row, i) => {
        if (row.length === 0){
          out.index.splice(i, 1)
          return false
        } else {
          return true
        }
      })

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues
    } else if (axis === 1){
      out = out.transpose()

      let newValues = out.values.map(helper).filter((col, i) => {
        if (col.length === 0){
          out.index.splice(i, 1)
          return false
        } else {
          return true
        }
      })

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues
      out = out.transpose()
    }

    return out
  }

  dropColumns(columns){
    assert(isArray(columns), "`columns` must be an array of strings.")
    assert(shape(columns).length === 1, "`columns` must be a 1-dimensional array of strings.")

    columns.forEach(col => {
      assert(isString(col), "Each item in the `columns` array must be a string.")
    })

    let self = this
    let out = self.copy()
    let outColumns = copy(out.columns)

    columns.forEach(col => {
      let index = outColumns.indexOf(col)
      assert(index > -1, `The column "${col}" does not exist!`)

      outColumns.splice(index, 1)

      out.values = out.values.map(row => {
        row.splice(index, 1)
        return row
      })
    })

    if (set(out.values).length === 0) return new DataFrame()
    out.columns = outColumns
    return out
  }

  dropRows(rows){
    assert(isArray(rows), "`rows` must be an array of strings.")
    assert(shape(rows).length === 1, "`rows` must be a 1-dimensional array of strings.")

    rows.forEach(row => {
      assert(isString(row), "Each item in the `rows` array must be a string.")
    })

    let self = this
    let out = self.copy()
    let outIndex = copy(out.index)

    rows.forEach(row => {
      let index = outIndex.indexOf(row)
      assert(index > -1, `The row "${row}" does not exist!`)

      outIndex.splice(index, 1)
      out.values.splice(index, 1)
    })

    if (set(out.values).length === 0) return new DataFrame()
    out.index = outIndex
    return out
  }

  toObject(){
    let self = this
    let out = {}

    self.values.forEach((row, i) => {
      let temp = {}

      row.forEach((value, j) => {
        temp[self.columns[j]] = value
      })

      out[self.index[i]] = temp
    })

    return out
  }

  print(){
    function truncate(text, maxLength){
      return text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text
    }

    function leftPad(text, minLength){
      while (text.length < minLength) text = " " + text
      return text
    }

    let self = this
    let maxColumnWidth = 8

    if (typeof window !== "undefined"){
      // browser
      let temp = self.copy()

      if (temp.columns.length > 10){
        temp = temp.getSubsetByNames(null, temp.columns.slice(0, 5).concat(temp.columns.slice(temp.columns.length - 5, temp.columns.length)))
        let newColumns = temp.columns

        temp = temp.assign({"...": range(0, temp.index.length).map(i => "...")})
        temp = temp.loc(null, newColumns.slice(0, newColumns.length / 2).concat(["..."]).concat(newColumns.slice(newColumns.length / 2, newColumns.length)))
      }

      if (temp.index.length > 10){
        temp = temp.getSubsetByIndices(range(0, 5).concat(range(temp.index.length - 5, temp.index.length)), null)
        let newIndex = temp.index

        temp.index.push("...")
        temp.values.push(range(0, temp.columns.length).map(i => "..."))
        temp = temp.loc(newIndex.slice(0, newIndex.length / 2).concat(["..."]).concat(newIndex.slice(newIndex.length / 2, newIndex.length)), null)
      }

      console.table(temp.toObject())
    } else {
      // node
      let totalWidth = process.stdout.columns
      let defaultWidth = 24
      let totalHeight = 24

      let temp = self.copy()

      if (temp.columns.length > 20){
        temp = temp.getSubsetByNames(null, temp.columns.slice(0, 10).concat(temp.columns.slice(temp.columns.length - 10, temp.columns.length)))
      }

      if (temp.index.length > totalHeight + 1){
        temp = temp.getSubsetByNames(temp.index.slice(0, 10).concat(temp.index.slice(temp.index.length - 15, temp.index.length)), null)
      }

      let columnWidths = temp.columns.map(col => {
        let values = temp.getSubsetByNames(null, [col]).values
        let lengths = values.concat([col]).map(v => v.toString().length)
        return min([defaultWidth, max(lengths)])
      })

      let lengthSoFar = 0
      let columnsToKeep = []
      let i = 0

      while (lengthSoFar < totalWidth / 2 && i < columnWidths.length / 2){
        lengthSoFar += columnWidths[i] + 3
        lengthSoFar += columnWidths[columnWidths.length - i - 1] + 3
        columnsToKeep.push(temp.columns[i])

        if (i !== columnWidths.length - i - 1){
          columnsToKeep.push(temp.columns[temp.columns.length - i - 1])
        }

        i++
      }

      columnsToKeep.sort((a, b) => {
        return self.columns.indexOf(a) < self.columns.indexOf(b) ? -1 : 1
      })

      let truncatedDataFrame = temp.getSubsetByNames(null, columnsToKeep)

      if (columnsToKeep.length < temp.columns.length){
        truncatedDataFrame = truncatedDataFrame.assign({
          "...": range(0, truncatedDataFrame.index.length).map(i => "...")
        })

        truncatedDataFrame = truncatedDataFrame.loc(null, columnsToKeep.slice(0, columnsToKeep.length / 2).concat(["..."]).concat(columnsToKeep.slice(columnsToKeep.length / 2, columnsToKeep.length)))

        columnWidths = truncatedDataFrame.columns.map(col => {
          let values = truncatedDataFrame.getSubsetByNames(null, [col]).values
          let lengths = values.map(v => v.toString().length)
          return min([defaultWidth, max(lengths)])
        })
      }

      if (truncatedDataFrame.values.length > totalHeight){
        truncatedDataFrame = truncatedDataFrame.iloc(range(0, totalHeight / 2).concat(range(truncatedDataFrame.values.length - totalHeight / 2, truncatedDataFrame.values.length)), null)
        let originalIndex = copy(truncatedDataFrame.index)

        truncatedDataFrame.index.push("...")
        truncatedDataFrame.values.push(range(0, truncatedDataFrame.columns.length).map(i => "..."))

        truncatedDataFrame = truncatedDataFrame.loc(originalIndex.slice(0, originalIndex.length / 2).concat(["..."]).concat(originalIndex.slice(originalIndex.length / 2, originalIndex.length)), null)
      }

      truncatedDataFrame.columns = truncatedDataFrame.columns.map((col, i) => {
        let width = columnWidths[i]
        return leftPad(truncate(col, width), width)
      })

      truncatedDataFrame.values = truncatedDataFrame.values.map(row => {
        return row.map((value, i) => {
          let width = columnWidths[i]
          return leftPad(truncate(value.toString(), width), width)
        })
      })

      let maxIndexWidth = min([defaultWidth, max(temp.index.map(row => row.toString().length))])

      truncatedDataFrame.index = truncatedDataFrame.index.map((row, i) => {
        return leftPad(truncate(row, maxIndexWidth), maxIndexWidth)
      })

      console.log(leftPad(" ", maxIndexWidth) + " | " + truncatedDataFrame.columns.join(" | "))
      console.log(leftPad(" ", maxIndexWidth).split("").map(s => "-").join("") + " | " + truncatedDataFrame.columns.map(col => col.split("").map(s => "-").join("")).join(" | "))
      console.log(truncatedDataFrame.values.map((row, i) => truncatedDataFrame.index[i] + " | " + row.join(" | ")).join("\n"))
    }
  }
}

module.exports = DataFrame

// tests
if (!module.parent && typeof(window) === "undefined"){
  let isEqual = require("../is-equal.js")
  let normal = require("../normal.js")
  let set = require("../set.js")
  let flatten = require("../flatten.js")
  let distance = require("../distance.js")
  let zeros = require("../zeros.js")
  let chop = require("../chop.js")
  let random = require("../random.js")

  let xShape = [17, 32]
  let x = normal(xShape)
  let df = new DataFrame(x)

  assert(isDataFrame(df), "`df` is not a DataFrame!")
  assert(isEqual(df.shape, xShape), "The shape of the DataFrame is not the same as the shape of its data!")
  assert(!df.isEmpty(), "`df` should not be empty!")
  assert((new DataFrame()).isEmpty(), "New DataFrames should be empty!")

  let clearedValues = set(df.clear().values)
  assert(clearedValues.length === 1 && isUndefined(clearedValues[0]), "Cleared DataFrames should only have `undefined` values.")

  let a = normal(100)
  let b = normal(100)
  let c = normal(100)
  df = new DataFrame({a, b, c})
  let dfShape = df.shape

  assert(isEqual(a, flatten(df.loc(null, ["a"]).values)), "The values in column 'a' are not the same as the values used to create it!")
  assert(isEqual(b, flatten(df.loc(null, ["b"]).values)), "The values in column 'b' are not the same as the values used to create it!")
  assert(isEqual(c, flatten(df.loc(null, ["c"]).values)), "The values in column 'c' are not the same as the values used to create it!")
  assert(isEqual(df.values, df.transpose().transpose().values), "A doubly-transposed DataFrame should have the same values as the original!")
  assert(chop(distance(df.values, zeros(df.shape)) - distance(df.transpose().values, zeros(df.transpose().shape))) === 0, "A transposed DataFrame's values should have the same 2-norm as the original!")
  assert(isSeries(df.getSubsetByNames(null, ["a"])), "A one-dimensional result should be a Series, not a DataFrame!")
  assert(isDataFrame(df.getSubsetByNames(null, ["b", "c"])), "A two-dimensional result should be a DataFrame, not a Series!")

  let e = new Series(normal(100))
  e.name = "e"
  df = df.assign(e)
  assert(isEqual(e.values, flatten(df.loc(null, ["e"]).values)), "The values in column 'e' are not the same as the values used to create it!")

  let hasFailed = false

  try {
    df.loc(df.index, df.columns)
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(!hasFailed, "`df.loc(df.index, df.columns)` should not have failed!")

  try {
    df.loc([], df.columns)
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`df.loc([], df.columns)` should have failed!")

  try {
    df.loc(df.index, [])
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`df.loc(df.index, [])` should have failed!")

  try {
    df.loc(["this doesn't exist"], ["this doesn't exist"])
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`df.loc([\"this doesn't exist\"], [\"this doesn't exist\"])` should have failed!")

  try {
    df.iloc(range(0, dfShape[0]), range(0, dfShape[1]))
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(!hasFailed, "`df.iloc(range(0, dfShape[0]), range(0, dfShape[1]))` should not have failed!")

  try {
    df.iloc()
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(!hasFailed, "`df.iloc()` should not have failed!")

  try {
    df.iloc([-5], [-7])
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`df.iloc([-5], [-7])` should have failed!")

  try {
    df.iloc([500], [700])
    hasFailed = false
  } catch(e) {
    hasFailed = true
  }

  assert(hasFailed, "`df.iloc([500], [700])` should have failed!")

  let df2 = df.copy()
  assert(isEqual(df, df2), "A DataFrame and its copy should evaluate as equal!")
  assert(!(df === df2), "A DataFrame and its copy should not be the same object!")

  df.index = range(0, dfShape[0]).map(i => Math.random().toString())
  assert(!isEqual(df.index, df2.index), "`df` should now have random row names!")

  df = df.resetIndex()
  assert(isEqual(df.index, df2.index), "`df` should now have its original row names!")

  let d = normal(100)
  df = df.assign({d})
  assert(isEqual(d, flatten(df.loc(null, ["d"]).values)), "The values in column 'd' are not the same as the values used to create it!")

  a = random(100)
  df = df.assign({a})
  assert(isEqual(a, flatten(df.loc(null, ["a"]).values)), "The values in column 'a' are not the same as the values that were assigned to it!")

  df = new DataFrame(zeros([3, 3]))

  df = df.apply((colName, colVals) => {
    return colVals.map((v, j) => {
      return colName + "/" + j
    })
  })

  let newValuesShouldBe = [
    ["col0/0", "col1/0", "col2/0"],
    ["col0/1", "col1/1", "col2/1"],
    ["col0/2", "col1/2", "col2/2"],
  ]

  assert(isEqual(newValuesShouldBe, df.values), "The DataFrame's new values should be as I've described!")

  df = new DataFrame(zeros([3, 3]))

  df = df.apply((rowName, rowVals) => {
    return rowVals.map((v, i) => {
      return rowName + "/" + i
    })
  }, 1)

  newValuesShouldBe = [
    ["row0/0", "row0/1", "row0/2"],
    ["row1/0", "row1/1", "row1/2"],
    ["row2/0", "row2/1", "row2/2"],
  ]

  assert(isEqual(newValuesShouldBe, df.values), "The DataFrame's new values should be as I've described!")

  df = new DataFrame([
    [0, null],
    [1, "foo"],
    [2, "bar"],
    [3, null],
    [4, null],
    [null, "uh-oh"],
  ])

  assert(isEqual(df.dropMissing().shape, [2, 2]), "The DataFrame should have a shape of [2, 2] after dropping missing values!")
  assert(isEqual(df.dropMissing().index, ["row1", "row2"]), "The DataFrame's new index should be as I've described!")
  assert(df.dropMissing(1).isEmpty(), "The DataFrame should be empty after dropping missing values!")
  assert(isEqual(df.dropMissing(1, "all").shape, df.shape), "The DataFrame should have its original shape after trying to drop missing values!")
  assert(isEqual(df.dropMissing(1, null, 4).shape, df.shape), "The DataFrame should have its original shape after trying to drop missing values!")
  assert(isEqual(df.dropMissing(1, null, 3).shape, [6, 1]), "The DataFrame should have a shape of [6, 1] after dropping missing values!")
  assert(df.dropMissing(1, null, 1).isEmpty(), "The DataFrame should be empty after dropping missing values!")

  console.log("All tests passed!")
}

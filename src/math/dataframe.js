let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")
let shape = require("./shape.js")
let transpose = require("./transpose.js")
let range = require("./range.js")
let isNumber = require("./is-number.js")
let isString = require("./is-string.js")
let apply = require("../misc/apply.js")
let isFunction = require("./is-function.js")

function isInteger(x){
  return isNumber(x) && parseInt(x) === x
}

function isWholeNumber(x){
  return isInteger(x) && x >= 0
}

function isObject(x){
  return x instanceof Object && !isArray(x)
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
        let dataShape = shape(x)
        assert(dataShape.length === 2, "The new array of values must be 2-dimensional!")

        if (dataShape[0] < self.index.length){
          self.index = self.index.slice(0, dataShape[0])
        } else if (dataShape[0] > self.index.length){
          self.index = self.index.concat(range(self.index.length, dataShape[0]).map(i => "row" + i))
        }

        if (dataShape[1] < self.columns.length){
          self.columns = self.columns.slice(0, dataShape[1])
        } else if (dataShape[1] > self.columns.length){
          self.columns = self.columns.concat(range(self.columns.length, dataShape[1]).map(i => "col" + i))
        }

        self._values = x
      },
    })

    self.columns = []
    self.index = []

    assert(isUndefined(data) || data instanceof Object, "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values.")

    if (data){
      if (isArray(data)){
        let dataShape = shape(data)
        assert(dataShape.length === 2, "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!")
        self.values = data
      } else {
        self.columns = Object.keys(data)
        let temp = []

        self.columns.forEach(col => {
          let values = data[col]
          temp.push(values)
        })

        self.values = transpose(temp)

        let dataShape = shape(self.values)
        self.index = range(0, dataShape[0]).map(i => "row" + i)
      }
    }
  }

  get shape(){
    let self = this
    return shape(self.values)
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

  resetIndex(){
    let self = this
    let out = self.copy()
    out.index = range(0, self.shape[0]).map(i => "row" + i)
    return out
  }

  copy(){
    let self = this
    let out = new DataFrame(copy(self.values))
    out.columns = self.columns.slice()
    out.index = self.index.slice()
    return out
  }

  assign(obj){
    assert(isObject(obj), "An object must be passed into the `assign` method.")

    let self = this
    let out = self.copy()
    let outShape = out.shape

    Object.keys(obj).forEach(col => {
      let values = obj[col]
      assert(values.length === outShape[0], `Column "${col}" in the new data is not the same length as the other columns in the original DataFrame.`)

      let colIndex = out.columns.indexOf(col)

      if (colIndex < 0){
        out.columns.push(col)
        colIndex = out.columns.indexOf(col)
      }

      out.values.forEach((row, i) => {
        row[colIndex] = values[i]
      })
    })

    return out
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
      let newIndex = copy(out.index)

      let newValues = out.values.map(helper).filter((row, i) => {
        if (row.length === 0){
          newIndex.splice(i, 1)
          return false
        } else {
          return true
        }
      })

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues
      out.index = newIndex
    } else if (axis === 1){
      out = out.transpose()
      let newIndex = copy(out.index)

      let newValues = out.values.map(helper).filter((col, i) => {
        if (col.length === 0){
          newIndex.splice(i, 1)
          return false
        } else {
          return true
        }
      })

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues
      out.index = newIndex
      out = out.transpose()
    }

    return out
  }
}

module.exports = DataFrame

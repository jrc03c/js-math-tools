let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")
let shape = require("./shape.js")
let transpose = require("./transpose.js")
let range = require("./range.js")
let isNumber = require("./is-number.js")
let isString = require("./is-string.js")

function isInteger(x){
  return isNumber(x) && parseInt(x) === x
}

function isWholeNumber(x){
  return isInteger(x) && x >= 0
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

  getColumn(col){
    let self = this

    assert(isString(col), "The column name must be a string.")
    assert(self.columns.indexOf(col) > -1, `The column name "${col}" does not exist in the list of columns.`)

    let temp = {}
    temp[col] = transpose(self.values)[self.columns.indexOf(col)]
    return new DataFrame(temp)
  }

  getRow(row){
    let self = this

    assert(isString(row), "The row name must be a string.")
    assert(self.index.indexOf(row) > -1, `The row name "${row}" does not exist in the list of rows.`)

    let index = self.index.indexOf(row)
    let out = new DataFrame([self.values[index]])
    out.index = [row]
    return out
  }

  getSubsetByNames(rows, cols){
    let self = this

    assert(isArray(rows) && isArray(cols), "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.")
    assert(shape(rows).length === 1 && shape(cols).length === 1, "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.")

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

    assert(isArray(rowIndices) && isArray(colIndices), "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.")
    assert(shape(rowIndices).length === 1 && shape(colIndices).length === 1, "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers.")

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

  transpose(){
    let self = this
    let out = new DataFrame(transpose(self.values))
    out.columns = self.index
    out.index = self.columns
    return out
  }
}

module.exports = DataFrame

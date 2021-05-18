let assert = require("./assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")
let shape = require("./shape.js")
let transpose = require("./transpose.js")
let range = require("./range.js")
let isNumber = require("./is-number.js")
let isString = require("./is-string.js")
let apply = require("./apply.js")
let isFunction = require("./is-function.js")
let ndarray = require("./ndarray.js")
let copy = require("./copy.js")
let Series = require("./series.js")
let flatten = require("./flatten.js")
let isEqual = require("./is-equal.js")
let max = require("./max.js")
let min = require("./min.js")
let set = require("./set.js")
let isBoolean = require("./is-boolean.js")
let random = require("./random.js")
let sort = require("./sort.js")

function makeKey(n){
	let alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
	let out = ""
	for (let i=0; i<n; i++) out += alpha[parseInt(Math.random() * alpha.length)]
	return out
}

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

function quote(s){
  let pattern = /"(.*?)"/g
  let matches = s.match(pattern)
  let out = s.slice()

  if (matches){
    matches.forEach(item => {
      out = out.replace(item, `“${item.substring(1, item.length-1)}”`)
    })
  }

  pattern = /'(.*?)'/g
  matches = s.match(pattern)

  if (matches){
    matches.forEach(item => {
      out = out.replace(item, `‘${item.substring(1, item.length-1)}’`)
    })
  }

  return `"${out}"`
}

function leftPad(x, maxLength){
  assert(isNumber(x), "The `leftPad` function only works on numbers!")
  let out = x.toString()
  while (out.length < maxLength) out = "0" + out
  return out
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
          self._index = self._index.concat(range(self._index.length, dataShape[0]).map(i => "row" + leftPad(i, (dataShape[0] - 1).toString().length)))
        }

        if (dataShape[1] < self._columns.length){
          self._columns = self._columns.slice(0, dataShape[1])
        } else if (dataShape[1] > self._columns.length){
          self._columns = self._columns.concat(range(self._columns.length, dataShape[1]).map(i => "col" + leftPad(i, (dataShape[1] - 1).toString().length)))
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
        self._index = range(0, dataShape[0]).map(i => "row" + leftPad(i, (dataShape[0] - 1).toString().length))
      }
    }
  }

  static async fromCSV(path, options){
    options = options || {}
    let raw

		// browser
		if (typeof(window) !== "undefined"){
	    const response = await fetch(path)
      raw = await response.text()
    }

    // node
    else {
      const fs = require("fs")
      const encoding = options.encoding || "utf8"
    	raw = fs.readFileSync(path, encoding)
    }

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
          return JSON.parse(value)
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
    const hasHeaderRow = typeof(options.hasHeaderRow) === "boolean" ? options.hasHeaderRow : true
		const hasIndexColumn = typeof(options.hasIndexColumn) === "boolean" ? options.hasIndexColumn : false

    if (hasHeaderRow){
			columns = out.shift()
    }

    if (hasIndexColumn){
			index = out.map(row => row.shift())
			if (columns) columns.shift()
    }

		out = new DataFrame(out)
		if (columns) out.columns = columns
		if (index) out.index = index
    return out
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
    return set(self.values).filter(v => !isUndefined(v)).length === 0
  }

  clear(){
    let self = this
    let out = new DataFrame(ndarray(self.shape))
    out.columns = self.columns.slice()
    out.index = self.index.slice()
    return out
  }

  get(rows, cols){
    let self = this

    if (isString(rows) || isNumber(rows)) rows = [rows]
    if (isString(cols) || isNumber(cols)) cols = [cols]

    let types = set((rows || []).concat(cols || []).map(v => typeof v))
    assert(types.length <= 2, "Only whole numbers and/or strings are allowed in `get` arrays!")

    if (types.length === 1){
      assert(types[0] === "string" || types[0] === "number", "Only whole numbers and/or strings are allowed in `get` arrays!")
    }

    if (types.length === 2){
      assert(types.indexOf("string") > -1, "Only whole numbers and/or strings are allowed in `get` arrays!")
      assert(types.indexOf("number") > -1, "Only whole numbers and/or strings are allowed in `get` arrays!")
    }

    if (!isUndefined(rows)){
      rows = rows.map(r => {
        if (typeof r === "string"){
          assert(self.index.indexOf(r) > -1, `Row "${r}" does not exist!`)
          return r
        }

        if (typeof r === "number"){
          assert(r >= 0, `Index ${r} is out of bounds!`)
          assert(parseInt(r) === r, `Row numbers must be integers!`)
          assert(r < self.index.length, `Index ${r} is out of bounds!`)
          return self.index[r]
        }
      })
    }

    if (!isUndefined(cols)){
      cols = cols.map(c => {
        if (typeof c === "string"){
          assert(self.columns.indexOf(c) > -1, `Column "${c}" does not exist!`)
          return c
        }

        if (typeof c === "number"){
          assert(c >= 0, `Column ${c} is out of bounds!`)
          assert(parseInt(c) === c, `Column numbers must be integers!`)
          assert(c < self.columns.length, `Column ${c} is out of bounds!`)
          return self.columns[c]
        }
      })
    }

    return self.getSubsetByNames(rows, cols)
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

    if (rows.length === 1 && cols.length === 1){
      return flatten(values)[0]
    }

    if (rows.length === 1){
      let out = new Series(flatten(values))
      out.name = rows[0]
      out.index = cols
      return out
    }

    if (cols.length === 1){
      let out = new Series(flatten(values))
      out.name = cols[0]
      out.index = rows
      return out
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
    out.index = range(0, self.shape[0]).map(i => "row" + leftPad(i, (out.index.length - 1).toString().length))
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

  assign(p1, p2){
    let name, obj

    if (isUndefined(p2)){
      obj = p1

      assert(!isArray(obj), "When using only one parameter for the `assign` method, the parameter must be an object or a Series.")
    } else {
      name = p1
      obj = p2

      assert(isString(name), "When using two parameters for the `assign` method, the first parameter must be a string.")
      assert(isSeries(obj) || (isArray(obj) && shape(obj).length === 1), "When using two parameters for the `assign` method, the second parameter must be a Series or a 1-dimensional array.")
    }

    assert(isObject(obj) || isSeries(obj) || (isArray(obj) && shape(obj).length === 1), "An object, Series, or 1-dimensional array must be passed into the `assign` method.")

    let self = this

    if (isSeries(obj)){
      let temp = {}
      assert (self.isEmpty() || isEqual(obj.index, self.index), "The index of the new data does not match the index of the DataFrame.")
      temp[name || obj.name] = obj.values
      return self.assign(temp)
    } else if (isArray(obj)){
      let temp = {}
      temp[name || "data"] = obj
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

    if (axis === 0){
      let temp = transpose(self.values)

      let newValues = temp.map((col, i) => {
        return fn(col, self.columns[i])
      })

      if (shape(newValues).length === 1){
        let out = new Series(newValues)
        out.index = copy(self.columns)
        return out
      }

      else {
        let out = new DataFrame(transpose(newValues))
        out.index = copy(self.index)
        out.columns = copy(self.columns)
        return out
      }
    } else if (axis === 1){
      let newValues = self.values.map((row, i) => {
        return fn(row, self.index[i])
      })

      if (shape(newValues).length === 1){
        let out = new Series(newValues)
        out.index = copy(self.index)
        return out
      }

      else {
        let out = new DataFrame(newValues)
        out.index = copy(self.index)
        out.columns = copy(self.columns)
        return out
      }
    }
  }

  map(fn, axis){
    let self = this
    return self.apply(fn, axis)
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
    let tempID = Math.random().toString()

    if (axis === 0){
      out = out.assign(tempID, out.index)

      let newValues = out.values.map(helper).filter(row => row.length > 0)

      if (shape(newValues).length < 2) return new DataFrame()

      out.values = newValues

      let newIndex = out.get(null, tempID)
      if (isUndefined(newIndex)) return new DataFrame()
      if (isString(newIndex)) newIndex = [newIndex]
      if (isSeries(newIndex)) newIndex = newIndex.values
      out.index = newIndex
      out = out.drop(null, tempID)
    } else if (axis === 1){
      out = out.transpose()
      out = out.assign(tempID, out.index)

      let newValues = out.values.map(helper).filter(col => col.length > 0)

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

  drop(rows, cols){
    let self = this

    if (isUndefined(rows)) rows = []
    if (isUndefined(cols)) cols = []
    if (isString(rows) || isNumber(rows)) rows = [rows]
    if (isString(cols) || isNumber(cols)) cols = [cols]

    assert(isArray(rows), "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.")
    assert(isArray(cols), "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.")
    assert(shape(rows).length === 1, "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.")
    assert(shape(cols).length === 1, "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings.")

		let outIndex, outColumns

		self.index.forEach((row, i) => {
			if (rows.indexOf(row) < 0 && row.indexOf(i) < 0){
				if (!outIndex) outIndex = []
				outIndex.push(row)
			}
		})

		self.columns.forEach((col, i) => {
			if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0){
				if (!outColumns) outColumns = []
				outColumns.push(col)
			}
		})

    let out = self.get(outIndex, outColumns)

    if (isSeries(out)){
			let temp = new DataFrame()
			temp = temp.assign(out)
			if (self.index.indexOf(out.name) > -1) temp = temp.transpose()
			out = temp
    }

    return out
  }

  dropColumns(columns){
    let self = this
    return self.drop(null, columns)
  }

  dropRows(rows){
    let self = this
    return self.drop(rows, null)
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

  toCSVString(){
    let self = this
    let index = ["(index)"].concat(copy(self.index))
    let columns = copy(self.columns)

    let out = [columns].concat(self.values).map((row, i) => {
      return [index[i]].concat(row).map(value => {
        if (typeof value === "string"){
          return quote(value)
        } else {
          return value
        }
      }).join(",")
    }).join("\n")

    return out
  }

  toCSV(filename){
    let self = this
    let out = self.toCSVString()

    // browser
    if (typeof window !== "undefined"){
      if (filename.includes("/")){
        let parts = filename.split("/")
        filename = parts[parts.length - 1]
      }

      let a = document.createElement("a")
      a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(out)}`
      a.download = filename
      a.dispatchEvent(new MouseEvent("click"))
    }

    // node
    else {
      let fs = require("fs")
      let path = require("path")
      fs.writeFileSync(path.resolve(filename), out, "utf8")
    }

    return self
  }

  print(){
    let self = this
		let maxRows = typeof window === "undefined" ? 20 : 10
		let halfMaxRows = parseInt(maxRows / 2)
    let maxColumns = typeof window === "undefined" ?  Math.floor(process.stdout.columns / 24) - 1 : 10
		let halfMaxColumns = parseInt(maxColumns / 2)

		let tempRows = maxRows > self.index.length ?
			null :
			range(0, halfMaxRows).concat(range(self.index.length - halfMaxRows, self.index.length))

		let tempColumns = maxColumns > self.columns.length ?
			null :
			range(0, halfMaxColumns).concat(range(self.columns.length - halfMaxColumns, self.columns.length))

		let temp = self.get(tempRows, tempColumns)

		if (maxRows <= self.index.length){
			temp._index.splice(halfMaxRows, 0, "...")
			temp._values.splice(halfMaxRows, 0, range(0, temp.columns.length).map(i => "..."))
		}

		if (maxColumns <= self.columns.length){
			temp._columns.splice(halfMaxColumns, 0, "...")

			temp._values = temp._values.map(row => {
				row.splice(halfMaxColumns, 0, "...")
				return row
			})
		}

    console.table(temp.toObject())
    return self
  }

  sort(cols, directions){
    let self = this

    // temporarily assign index as column in dataframe
    let out = self.copy()
    let indexID = random().toString()
    out = out.assign(indexID, out.index)

    if (isUndefined(cols)){
      cols = [indexID]
      directions = [true]
    }

    if (isNumber(cols) || isString(cols)){
      cols = [cols]
      if (isBoolean(directions) || isString(directions)) directions = [directions]
    }

    assert(isArray(cols), "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null.")
    assert(shape(cols).length === 1, "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null.")

    if (isUndefined(directions)) directions = range(0, cols.length).map(i => true)

    assert(isArray(directions), "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null.")
    assert(shape(directions).length === 1, "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null.")

    assert(cols.length === directions.length, "The arrays passed into the `sort` method must be equal in length.")

    // convert all columns to indices
    cols = cols.map(col => {
      assert(isString(col) || isNumber(col), "Column references can either be column names (as strings) or column indices (as whole numbers).")

      if (isString(col)){
        let index = out.columns.indexOf(col)
        assert(index > -1, `The column "${col}" does not exist!`)
        return index
      }

      if (isNumber(col)){
        assert(parseInt(col) === col, "Column indices must be whole numbers!")
        assert(col >= 0, `The column index ${col} is out of bounds!`)
        assert(col < out.columns.length, `The index ${col} is out of bounds!`)
        return col
      }
    })

    // convert all directions to booleans
    directions = directions.map(dir => {
      assert(isString(dir) || isBoolean(dir), "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false).")

      if (isString(dir)){
        let value = dir.trim().toLowerCase()
        assert(value === "ascending" || value === "descending", "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false).")
        return value === "ascending"
      }

      if (isBoolean(dir)){
        return dir
      }
    })

    // sort
    out.values = sort(out.values, (a, b) => {
      let counter = 0

      while(a[cols[counter]] === b[cols[counter]] && counter < cols.length){
        counter++
      }

      let isAscending = directions[counter]
      if (a[cols[counter]] === b[cols[counter]]) return 0
      if (a[cols[counter]] < b[cols[counter]]) return (isAscending ? -1 : 1)
      if (a[cols[counter]] > b[cols[counter]]) return (isAscending ? 1 : -1)
    })

    out.index = flatten(out.get(null, indexID).values)
    out = out.dropColumns(indexID)
    return out
  }

  sortByIndex(){
    let self = this
    return self.sort()
  }

  filter(fn, axis){
    assert(isFunction(fn), "The `filter` method takes a single parameter: a function that is used to filter the values.")

    if (isUndefined(axis)) axis = 0
    assert(axis === 0 || axis === 1, "The `axis` parameter to the `filter` method must be 0 or 1.")

    let self = this
    let out = self.copy()
		if (out.isEmpty()) return out
		
    let index = copy(out.index)
    let columns = copy(out.columns)

    if (axis === 0){
      let indexID = Math.random().toString()
      out = out.assign(indexID, out.index)

      let newValues = out.values.filter((row, i) => {
        let shouldKeep = fn(row, i, out)
        if (!shouldKeep) index.splice(i, 1)
        return shouldKeep
      })

      if (flatten(newValues).length === 0) return new DataFrame()
      if (shape(newValues).length === 1) newValues = [newValues]

      out.values = newValues
      out.index = out.get(null, indexID).values
      out = out.drop(null, indexID)
    } else if (axis === 1){
      out = out.transpose()

      let columnsID = Math.random().toString()
      out = out.assign(columnsID, out.index)

      let newValues = out.values.filter((row, i) => {
        let shouldKeep = fn(row, i, out)
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

  shuffle(axis){
    if (isUndefined(axis)) axis = 0
    assert(axis === 0 || axis === 1, "The `axis` parameter to the `shuffle` must be 0, 1, or undefined.")
    let self = this

    return self.get(
      axis === 0 ? shuffle(self.index) : null,
      axis === 1 ? shuffle(self.columns) : null,
    )
  }
}

module.exports = DataFrame

// tests
if (!module.parent && typeof(window) === "undefined"){
  let isEqual = require("./is-equal.js")
  let normal = require("./normal.js")
  let flatten = require("./flatten.js")
  let distance = require("./distance.js")
  let zeros = require("./zeros.js")
  let chop = require("./chop.js")
  let print = require("./print.js")

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
  // assert(isSeries(df.getSubsetByNames(null, ["a"])), "A one-dimensional result should be a Series, not a DataFrame!")
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

  df = df.apply((colVals, colName) => {
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

  df = df.apply((rowVals, rowName) => {
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

  x = new DataFrame(
    [[ 5,  6,  4,  1,  6,  7,  2,  8,  6,  1],
     [ 3,  8,  9,  6, 10,  1,  8,  5,  9,  6],
     [ 5,  7,  3,  4,  1,  2,  8,  4,  6,  4],
     [ 6,  8,  2,  4,  4,  8,  2,  8,  7,  4],
     [ 3,  3,  7,  5,  1,  8,  9,  2,  6,  8],
     [ 1,  5,  7,  7,  7,  1,  0,  9,  8,  5],
     [10,  8,  0,  4,  4,  8,  4,  2,  5,  3],
     [ 9,  2,  6,  0, 10,  6,  3,  5, 10,  8],
     [ 4,  9,  1,  4,  9,  4,  8,  9,  6,  7],
     [ 3,  3,  1,  2,  5,  5,  8,  5,  3,  2]]
  )

  let sortedXValues =
    [[ 3,  8,  9,  6, 10,  1,  8,  5,  9,  6],
     [ 9,  2,  6,  0, 10,  6,  3,  5, 10,  8],
     [ 4,  9,  1,  4,  9,  4,  8,  9,  6,  7],
     [ 1,  5,  7,  7,  7,  1,  0,  9,  8,  5],
     [ 5,  6,  4,  1,  6,  7,  2,  8,  6,  1],
     [ 3,  3,  1,  2,  5,  5,  8,  5,  3,  2],
     [ 6,  8,  2,  4,  4,  8,  2,  8,  7,  4],
     [10,  8,  0,  4,  4,  8,  4,  2,  5,  3],
     [ 5,  7,  3,  4,  1,  2,  8,  4,  6,  4],
     [ 3,  3,  7,  5,  1,  8,  9,  2,  6,  8]]

  let sortedX = x.sort(["col4", "col5", "col1"], [false, true, false])

  assert(isEqual(sortedX.values, sortedXValues), "The `sort` method didn't work as expected!")
  assert(isEqual(sortedX.index, ['row1', 'row7', 'row8', 'row5', 'row0', 'row9', 'row3', 'row6', 'row2',
       'row4']), "The indices of the sorted DataFrame are not correct!")
  assert(isEqual(sortedX.columns, ['col0', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8',
       'col9']), "The columns of the sorted DataFrame are not correct!")

  console.log("All tests passed!")
}

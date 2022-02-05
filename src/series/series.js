const assert = require("../assert.js")
const isArray = require("../is-array.js")
const isUndefined = require("../is-undefined.js")
const shape = require("../shape.js")
const transpose = require("../transpose.js")
const range = require("../range.js")
const isNumber = require("../is-number.js")
const isString = require("../is-string.js")
const apply = require("../apply.js")
const isFunction = require("../is-function.js")
const ndarray = require("../ndarray.js")
const copy = require("../copy.js")
const set = require("../set.js")
const reverse = require("../reverse.js")
const sort = require("../sort.js")
const isBoolean = require("../is-boolean.js")
const DataFrame = require("../dataframe/dataframe.js")

function isInteger(x) {
  return isNumber(x) && parseInt(x) === x
}

function isWholeNumber(x) {
  return isInteger(x) && x >= 0
}

function isObject(x) {
  return x instanceof Object && !isArray(x) && x !== null
}

function isDataFrame(x) {
  return x instanceof DataFrame
}

function isSeries(x) {
  return x instanceof Series
}

function leftPad(x, maxLength) {
  assert(isNumber(x), "The `leftPad` function only works on numbers!")
  let out = x.toString()
  while (out.length < maxLength) out = "0" + out
  return out
}

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
    const dataShape = self.shape

    if (isUndefined(indices)) indices = range(0, dataShape[0])

    assert(
      isArray(indices),
      "The `indices` array must be 1-dimensional array of whole numbers."
    )

    assert(
      shape(indices).length === 1,
      "The `indices` array must be a 1-dimensional array of whole numbers."
    )

    assert(
      indices.length > 0,
      "The `indices` array must contain at least one index."
    )

    indices.forEach(index => {
      assert(
        isWholeNumber(index),
        "The `indices` array must be a 1-dimensional array of whole numbers."
      )

      assert(
        index < self.index.length,
        `The row index ${index} is out of bounds.`
      )
    })

    const rows = indices.map(i => self.index[i])
    return self.getSubsetByNames(rows)
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
    assert(
      isFunction(fn),
      "The parameter to the `apply` method must be a function."
    )

    const self = this
    const out = self.copy()
    out.values = out.values.map((v, i) => fn(v, out.index[i]))
    return out
  }

  dropMissing(condition, threshold) {
    const self = this
    const out = self.copy()
    const outIndex = []

    out.values = out.values.filter((v, i) => {
      if (isUndefined(v)) {
        return false
      } else {
        outIndex.push(out.index[i])
        return true
      }
    })

    out.index = outIndex
    return out
  }

  toObject() {
    const self = this
    const out = {}
    out[self.name] = {}

    self.index.forEach((index, i) => {
      out[self.name][index] = self.values[i]
    })

    return out
  }

  print() {
    const self = this
    let temp = self.copy()
    const maxRows = typeof window === "undefined" ? 20 : 10

    if (temp.index.length > maxRows) {
      temp = temp.get(
        range(0, maxRows / 2).concat(
          range(temp.index.length - maxRows / 2, temp.index.length)
        )
      )

      const tempIndex = copy(temp.index)
      tempIndex.splice(parseInt(tempIndex.length / 2), 0, "...")
      temp.values.push("...")
      temp.index.push("...")
      temp = temp.get(tempIndex)
    }

    const out = {}

    temp.values.forEach((value, i) => {
      const obj = {}
      obj[temp.name] = value
      out[temp.index[i]] = obj
    })

    console.table(out)
    return self
  }

  sort(direction) {
    assert(
      isBoolean(direction) || isString(direction) || isUndefined(direction),
      "The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false)."
    )

    let isAscending = true

    if (isUndefined(direction)) {
      isAscending = true
    }

    if (isString(direction)) {
      direction = direction.trim().toLowerCase()

      assert(
        direction === "ascending" || direction === "descending",
        "The `sort` method can take an optional parameter that's either a string representing a direction ('ascending' or 'descending') or a boolean representing whether or not the direction is ascending (true or false)."
      )

      isAscending = direction === "ascending"
    }

    if (isBoolean(direction)) {
      isAscending = direction
    }

    const self = this
    let temp = transpose([self.values, self.index])

    temp = transpose(
      sort(temp, (a, b) => {
        if (a[0] === b[0]) return 0
        if (a[0] < b[0]) return isAscending ? -1 : 1
        if (a[0] > b[0]) return isAscending ? 1 : -1
      })
    )

    const out = new Series(temp[0])
    out.index = temp[1]
    out.name = self.name
    return out
  }

  sortByIndex() {
    const self = this
    let temp = transpose([self.values, self.index])

    temp = transpose(
      sort(temp, (a, b) => {
        if (a[1] === b[1]) return 0
        if (a[1] < b[1]) return -1
        if (a[1] > b[1]) return 1
      })
    )

    const out = new Series(temp[0])
    out.index = temp[1]
    out.name = self.name
    return out
  }

  filter(fn) {
    const self = this
    let out = self.copy()
    const index = copy(out.index)
    const indicesToRemove = []

    const newValues = out.values.filter((value, i) => {
      const shouldKeep = fn(value, i, out.values)
      if (!shouldKeep) indicesToRemove.push(out.index[i])
      return shouldKeep
    })

    indicesToRemove.forEach(i => {
      index.splice(index.indexOf(i), 1)
    })

    if (newValues.length === 0) {
      out = new Series()
      out.name = self.name
      return out
    }

    out.values = newValues
    out.index = index
    return out
  }
}

module.exports = Series

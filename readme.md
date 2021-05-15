# Introduction

**js-math-tools** is a little library of (you guessed it) math tools for JS. It was built completely from scratch and has no other dependencies.

# Installation

```bash
npm install --save https://github.com/jrc03c/js-math-tools
```

For client-side use, attach the `dist/js-math-tools.js` file to your web page:

```html
<script src="path/to/js-math-tools.js"></script>
```

For use in Node:

```js
let tools = require("js-math-tools")
```

# General Usage

You can either pull individual functions out, like:

```js
let { add } = require("js-math-tools")
add(3, 4) // 7
```

Or, for easier access, you can "dump" all of the functions into the global scope:

```js
require("js-math-tools").dump()
add(3, 4) // 7
```

Most of the typical math functions (like sine, cosine, etc.) can take individual numeric values, arrays of numbers, or a combination of numbers and arrays of numbers. For example, all of the following are acceptable:

```js
add(3, 4) // 7
add([2, 3, 4], [5, 6, 7]) // [7, 9, 11]
add([5, 10, 15], 10) // [15, 20, 25]
add(-7, [10, 11, 12]) // [3, 4, 5]
```

There's a handy helper function called `vectorize` that can turn any arbitrary function into a function that operates on these mixed types of parameters (individual values or arrays of the same types of values). For example:

```js
require("js-math-tools").dump()

function divide(a, b){
  return a / b
}

divide = vectorize(divide)

divide(10, 2) // 5
divide([20, 30, 40], 10) // [2, 3, 4]
divide(24, [6, 8, 12]) // [4, 3, 2]
divide([20, 30, 40], [40, 30, 20]) // [0.5, 1, 2]
```

# Working with Arrays

Unlike some other JS math libraries, this library does _not_ provide a wrapper around standard JS arrays. Therefore, pretty much everything is handled through functions, not objects. Here are some examples of things you might want to do with (_n_-dimensional) arrays.

```js
require("js-math-tools").dump()

// make an empty array
let arr1 = ndarray(5)
// [undefined, undefined, undefined, undefined, undefined]

// make an empty array of a specific shape (e.g., with 3 rows and 2 columns)
let arr2 = ndarray([3, 2])
// [[undefined, undefined], [undefined, undefined], [undefined, undefined]]

// make an array of zeros
let arr3 = zeros(10)
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// make an array of ones
let arr4 = ones(10)
// [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

// make an array of 10,000 normally distributed values
let arr5 = normal(10000)

// make an array of random values (between 0 and 1) with 1,000 rows and 20 columns
let arr6 = random([1000, 20])

// add arrays together
add(normal([20, 30]), normal([20, 30]))

// get the dot-product of two 2-dimensional arrays
// NOTE: (n > 2)-dimensional arrays are not supported for the `dot` function!
dot(random([10, 20]), random([20, 5]))

// get statistics about an array of numbers
let x = normal(10000)
mean(x)
median(x)
mode(x)
std(x)
variance(x)
min(x)
max(x)

// get statistics about two arrays
let a = normal(10000)
let b = normal(10000)
correl(a, b)
cohensd(a, b)
covariance(a, b)
distance(a, b)

// get a range of numbers by step
range(4, 8)
// [4, 5, 6, 7]

range(0, 3, 0.5)
// [0, 0.5, 1, 1.5, 2, 2.5]

// get the shape of an array
shape(normal([4, 3, 2]))
// [4, 3, 2]

// transpose a 2-dimensional array
// NOTE: (n > 2)-dimensional arrays are not supported for the `transpose` function!
shape(transpose(normal([50, 10])))
// [10, 50]

// get the sum of all values in an array
sum(normal([20, 20]))

// get the set of values in an array
set([2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 3, 3, 3, 2, 2])
// [2, 3, 4]

// shuffle an array
shuffle(range(0, 10))
// [3, 2, 6, 5, 4, 9, 8, 1, 0, 7]

// sort an array by a function
sort(["b", "c", "a"], function(a, b){
  if (a < b) return -1
  if (a > b) return 1
  return 0
})
// ["a", "b", "c"]

// get a slice of an array
let arr7 = [
  [2, 3, 4],
  [5, 6, 7]
]

let which = [null, 1]
slice(arr7, which)
// [3, 6]

which = [0, null]
slice(arr7, which)
// [2, 3, 4]

which = [1, 2]
slice(arr7, which)
// [7]

// flatten an array
flatten([[2, 3, 4], [5, 6, 7]])
// [2, 3, 4, 5, 6, 7]
```

# Working with Random Numbers

The PRNG (pseudo-random number generator) implemented in this library is technically a [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator), in case that matters to you. To seed the PRNG, pass a positive integer into the `seed` function. The `random`, `normal`, and `shuffle` functions can all be seeded. For example:

```js
require("js-math-tools").dump()

seed(230498349)
random(5)
// [0.5713683813810349, 0.36495184898376465, 0.04452776908874512, 0.015275746583938599, 0.23413866385817528]

seed(230498349)
random(5)
// [0.5713683813810349, 0.36495184898376465, 0.04452776908874512, 0.015275746583938599, 0.23413866385817528]
```

# Series & DataFrames

I recently added some helper classes to mimic the behavior of Python's [pandas](https://pandas.pydata.org/) library. Note that these classes do not fully implement the functionality of the pandas `DataFrames` and `Series`!

Here are some of the things that you can do with Series:

```js
require("js-math-tools").dump()

let series = new Series([1, 2, 3, 4, 5])

console.log(series.values) // [1, 2, 3, 4, 5]
console.log(series.name) // data
console.log(series.index) // ["row0", "row1", "row2", "row3", "row4"]
console.log(series.shape) // [5]
console.log(series.isEmpty()) // false
console.log(series.clear().values) // [undefined, undefined, undefined, undefined, undefined]
console.log(series.getSubsetByNames(["row0", "row2", "row4"]).values) // [1, 3, 5]
console.log(series.loc(["row0", "row2", "row4"]).values) // [1, 3, 5]
console.log(series.getSubsetByIndices([0, 2, 4]).values) // [1, 3, 5]
console.log(series.iloc([0, 2, 4]).values) // [1, 3, 5]
console.log(series.reverse().values) // [5, 4, 3, 2, 1]
console.log(series.reverse().index) // ["row4", "row3", "row2", "row1", "row0"]
console.log(series.reverse().resetIndex().index) // ["row0", "row1", "row2", "row3", "row4"]
console.log(series.copy().values) // [1, 2, 3, 4, 5]
console.log(series.apply((index, x) => x * 2).values) // [2, 4, 6, 8, 10]

series.values[0] = null
series.values[3] = null

console.log(series.values) // [null, 2, 3, null, 5]
console.log(series.dropMissing().values) // [2, 3, 5]
console.log(series.dropMissing().index) // ["row1", "row2", "row4"]
```

And here are some of the things you can do with `DataFrame`:

```js
require("js-math-tools").dump()

let x = new DataFrame([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
x.print()
/*
     | col0 | col1 | col2
---- | ---- | ---- | ----
row0 |    1 |    2 |    3
row1 |    4 |    5 |    6
row2 |    7 |    8 |    9
*/

x = new DataFrame({a: range(0, 5), b: range(5, 10), c: range(10, 15)})
x.print()
/*
     | a | b |  c
---- | - | - | --
row0 | 0 | 5 | 10
row1 | 1 | 6 | 11
row2 | 2 | 7 | 12
row3 | 3 | 8 | 13
row4 | 4 | 9 | 14
*/

console.log(x.shape) // [5, 3]
console.log(x.isEmpty()) // false
console.log(x.clear().isEmpty()) // true
console.log(x.clear().shape) // [5, 3]

let subset = x.getSubsetByNames(["row2", "row4"], ["b", "a"]) // or x.loc(...)
subset.print()
/*
     | b | a
---- | - | -
row2 | 7 | 2
row4 | 9 | 4
*/

subset = x.getSubsetByIndices([0, 2, 4], null) // or x.iloc(...)
subset.print()
/*
     | a | b |  c
---- | - | - | --
row0 | 0 | 5 | 10
row2 | 2 | 7 | 12
row4 | 4 | 9 | 14
*/

x.transpose().print() // or x.T.print()
/*
  | row0 | row1 | row2 | row3 | row4
- | ---- | ---- | ---- | ---- | ----
a |    0 |    1 |    2 |    3 |    4
b |    5 |    6 |    7 |    8 |    9
c |   10 |   11 |   12 |   13 |   14
*/

let xCopy = x.copy()
console.log(isEqual(x, xCopy)) // true
console.log(x === xCopy) // false

x = x.assign({d: range(15, 20)})
x.print()
/*
     | a | b |  c |  d
---- | - | - | -- | --
row0 | 0 | 5 | 10 | 15
row1 | 1 | 6 | 11 | 16
row2 | 2 | 7 | 12 | 17
row3 | 3 | 8 | 13 | 18
row4 | 4 | 9 | 14 | 19
*/

x.apply(col => reverse(col), 0) // axis = 0
x.apply(row => reverse(row), 1) // axis = 1
x.dropMissing() // drop any row that contains null / undefined values
x.dropMissing(0) // same
x.dropMissing(1) // drop any column that contains null / undefined values
x.dropMissing(0, "any") // drop any row that contains null / undefined values
x.dropMissing(0, "all") // drop a row only if all of its values are null / undefined
x.dropMissing(0, null, 5) // drop a row only if it contains at least 5 null / undefined values

x.dropColumns(["a", "c"])
x.dropRows(["row4", "row2"])

console.log(x.toObject())
/*
{
  row0: { a: 0, b: 5, c: 10, d: 15 },
  row1: { a: 1, b: 6, c: 11, d: 16 },
  row2: { a: 2, b: 7, c: 12, d: 17 },
  row3: { a: 3, b: 8, c: 13, d: 18 },
  row4: { a: 4, b: 9, c: 14, d: 19 }
}
*/

x.toCSV("data.csv")
```

Finally, you can read CSV files like this:

```js
DataFrame.fromCSV("path/to/some.csv", {
	hasHeaderRow: true,
	hasIndexColumn: false,
}).then(data => {
	// do something with `data`
})
```

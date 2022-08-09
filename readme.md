# Introduction

**js-math-tools** is a little library of (you guessed it) math tools for JS. It was built completely from scratch and has no other dependencies (though it does have some dependencies for bundling, linting, testing, etc.).

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

# Usage

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

# API

## `abs(x)`

Returns the absolute value where `x` is a number or an arbitrarily nested array of numbers.

## `add(a, b)`

Returns the sum where `a` and `b` are numbers or arbitrarily nested arrays of numbers. Note that `a` and `b` don't both have to be the same type; `a` could be a number while `b` could be an arbitrarily nested array of numbers, or vice versa.

## `append(a, b, axis=0)`

Returns the concatenation of vectors or matrices `a` and `b`. In the case of vectors, the resulting vector will just be the simple concatenation of the two input vectors. But in the case of matrices, the result depends on the `axis`. If the `axis` is 0, then the rows of `a` will be stacked "on top of" the rows of `b`; whereas if `axis` is 1, then each corresponding row of `a` and `b` will be joined side-by-side, as in the case of vectors. For example:

```js
const a = [
  [1, 2, 3],
  [4, 5, 6],
]

const b = [
  [100, 200, 300],
  [400, 500, 600],
]

console.log(append(a, b, 0))
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [100, 200, 300],
//   [400, 500, 600],
// ]

console.log(append(a, b, 1))
// [
//   [1, 2, 3, 100, 200, 300],
//   [4, 5, 6, 400, 500, 600]
// ]
```

## `apply(x, fn)`

Applies the function `fn` to each item in the arbitrarily nested array `x`. Note that this is a subtly different functionality than [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). When a function is passed into an array's `map` method, that function is applied to every item at the shallowest level of the array. So, for example, if the array is 2-dimensional, then the `map` method would apply a function to each child array in the parent array. But the `apply` function doesn't quite work that way; instead, it applies a function on each item in an arbitrarily nested array, regardless of depth. In that sense, the function passed into the `apply` function will never be given an array as an argument; it can be passed any other data type, but _not_ an array.

For example, when using an array's `map` method, we can get information about each child array, like its length.

```js
const x = [[100], [200, 300], [400, 500, 600]]
const lengths = x.map(row => row.length)
console.log(lengths)
// [1, 2, 3]
```

But this can't possibly work when using `apply` because child arrays will never be passed into the given function. If we try to run the same thing again using the `apply` function, we'll get results that are perhaps unexpected:

```js
const x = [[100], [200, 300], [400, 500, 600]]
const lengths = apply(x, row => row.length)
console.log(lengths)
// [
//   [undefined],
//   [undefined, undefined],
//   [undefined, undefined, undefined],
// ]
```

That's because `apply` is trying to pass numbers into the given function, not arrays. Here's an example that uses `apply` correctly:

```js
const x = [[100], [200, 300], [400, 500, 600]]
const y = apply(x, v => v * 2)
console.log(y)
// [
//   [200],
//   [400, 600],
//   [800, 1000, 1200],
// ]
```

## `arccos(x)`

Returns the inverse cosine where `x` is a number or an arbitrarily nested array of numbers.

## `arcsin(x)`

Returns the inverse sine where `x` is a number or an arbitrarily nested array of numbers.

## `arctan(x)`

Returns the inverse tangent where `x` is a number or an arbitrarily nested array of numbers.

## `argmax(x)`

Returns the index of the maximum value in the arbitrarily nested array `x`. If `x` is 1-dimensional, then a whole number will be returned. If, however, `x` is arbitrarily nested, then the returned value will be an array of whole numbers representing indices at each dimension. For example:

```js
const a = [1, 5, 3]
console.log(argmax(a))
// 1

const b = [
  [1, 5],
  [3, 4],
  [9, 2],
]

console.log(argmax(b))
// [2, 0]
// i.e., row 2, item 0

const c = [1, [2, 3, [4, 5, 6, [7, 8, 9, 10]]]]
console.log(argmax(c))
// [1, 2, 3, 3]
// i.e., row 1, sub-row 2, sub-sub-row 3, item 3
```

## `argmin(x)`

Returns the index of the minimum value in the arbitrarily nested array `x`. If `x` is 1-dimensional, then a whole number will be returned. If, however, `x` is arbitrarily nested, then the returned value will be an array of whole numbers representing indices at each dimension. See `argmax` for examples of the returned values.

## `assert(condition, message)`

Does nothing if `condition` is true; otherwise, it throws an error with the given `message` string.

## `ceil(x)`

Given a number `x`, returns either the next highest integer (if `x` has a fractional component) or `x` itself (if `x` is already an integer). Note that `x` can also be an arbitrarily nested array of numbers.

## `chop(x, threshold=1e-10)`

Returns 0 if the absolute value of `x` is less than the `threshold`; otherwise, it returns `x`. Both `x` and `threshold` can be either numbers or arbitrarily nested arrays of numbers.

## `clamp(x, min, max)`

Returns `min` if `x` is less than `min`; returns `max` if `x` is greater than `max`; otherwise, returns `x`. All of `x`, `min`, and `max` can be numbers or arbitrarily nested arrays of numbers.

## `combinations(x, r)`

Given an arbitrarily nested array `x`, returns all possible combinations of `r` items from `x`. Note that any nesting of `x` will be ignored — i.e., `x` will be "flattened" into a 1-dimensional array before getting the combinations — so it won't be possible with this function to get combinations of arrays.

## `copy(x)`

Returns a copy of `x`. The only exception occurs if `x` is an instance of a custom class. In such a case, a plain JavaScript `Object` will be returned, though bearing the same members as `x` but not an instance of the same class. Also, this function handles circular references by replacing them with strings like `"<reference to '/some/path/down/into/the/object'>"`.

## `correl(a, b)`

Returns the correlation of `a` and `b`, which are 1-dimensional arrays of numbers.

## `cos(x)`

Returns the cosine where `x` is a number or an arbitrarily nested array of numbers.

## `count(x, items)`

Given an arbitrarily nested array `x`, returns an array of objects, each of which has the members "item" and "count" to indicate how many times a given item appeared in `x`. Using `items` is optional; but if used, it can be any kind of value or an array of values. Do note, though, that it's not currently possible to count appearances of child arrays in `x`; only other types can be counted. That's because `x` is "flattened" into a 1-dimensional array before the counting begins.

## `covariance(a, b)`

Returns the covariance between two 1-dimensional arrays, `a` and `b`.

## `DataFrame(x)`

The `DataFrame` class is similar to pandas' [`DataFrame`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html). They at least represent the same kind of data (2-dimensional arrays with row and column names), though they probably differ in many of their members.

The constructor for a `DataFrame` can optionally receive a value `x`, which can be any of these:

- another `DataFrame`
- a 2-dimensional array
- an object whose key-value pairs represent column names and column values, respectively

### `DataFrame.append()`

### `DataFrame.apply()`

### `DataFrame.assign()`

### `DataFrame.copy()`

### `DataFrame.dropMissing()`

### `DataFrame.dropNaN()`

### `DataFrame.drop()`

### `DataFrame.filter()`

### `DataFrame.fromCSVString()`

### `DataFrame.fromCSV()`

### `DataFrame.getDummies()`

### `DataFrame.getSubsetByIndices()`

### `DataFrame.getSubsetByNames()`

### `DataFrame.get()`

### `DataFrame.join()`

### `DataFrame.print()`

### `DataFrame.resetIndex()`

### `DataFrame.shuffle()`

### `DataFrame.sort()`

### `DataFrame.toCSVString()`

### `DataFrame.toCSV()`

### `DataFrame.toJSONString()`

### `DataFrame.toJSON()`

### `DataFrame.toObject()`

## `diff(a, b)`

Returns the difference between `set(a)` and `set(b)`; i.e., the set of values that are included in `a` and _not_ included in `b`. Note that `a` and `b` can be arbitrarily nested arrays containing any types of values.

## `distance(a, b)`

Returns the 2-norm (i.e., the Euclidean distance) between arbitrarily nested arrays `a` and `b`. And though `a` and `b` can have any shape, they must have the _same_ shape as each other.

## `divide(a, b)`

Returns the result of `a` divided by `b`. Both `a` and `b` can be numbers or arbitrarily nested arrays of numbers.

## `dot(a, b)`

Returns the dot product of vectors or matrices `a` and `b`.

## `dropMissing(x)`

Returns a copy of arbitrarily nested array `x` without any undefined or null values. Note that dropping values from nested arrays may result in jagged arrays.

## `dropMissingPairwise(a, b)`

Returns copies of arbitrarily nested arrays `a` and `b` without any undefined or null values. Note that `a` and `b` must have the same shape. Also note that dropping values from nested arrays may result in jagged arrays.

## `dropNaN(x)`

Returns a copy of arbitrarily nested array `x` without any non-numerical values. Note that dropping values from nested arrays may result in jagged arrays.

## `dropNaNPairwise(a, b)`

Returns copies of arbitrarily nested arrays `a` and `b` without any non-numerical values. Note that `a` and `b` must have the same shape. Also note that dropping values from nested arrays may result in jagged arrays.

## `dropUndefined(x)`

Identical to `dropMissing`.

## `exp(x)`

Returns _e_ to the power of `x` where `x` is a number or an arbitrarily nested array of numbers.

## `factorial(x)`

Returns the factorial where `x` is an integer or an arbitrarily nested array of integers.

## `find(x, fn)`

Returns the first value that causes the `fn` function to evaluate to true when evaluated on every item in `x`. Note that `x` can be an arbitrarily nested array _or_ an object.

## `findAll(x, fn)`

Returns all of the values that cause the `fn` function to evaluate to true when evaluated on every item in `x`. Note that `x` can be an arbitrarily nested array _or_ an object.

## `flatten(x)`

Returns a 1-dimensional copy of arbitrarily nested array `x`.

## `float(x)`

Returns `x` converted to a floating point number.

## `floor(x)`

Given a number `x`, returns either the next lowest integer (if `x` has a fractional component) or `x` itself (if `x` is already an integer). Note that `x` can also be an arbitrarily nested array of numbers.

## `getValueAt(x, index)`

Returns the value at `index` in `x`. Note that `x` can be an arbitrarily nested array _or_ an object; but `index` must be a single value (like a whole number or string) or a 1-dimensional array of whole numbers or strings.

## `identity(n)`

Returns an identity matrix of size `n` ✕ `n`.

## `indexOf(x, fn)`

Returns the index of the first value that causes the `fn` function to evaluate to true when evaluated on every item in `x`. Note that `x` can be an arbitrarily nested array _or_ an object.

## `indexesOf(x, fn)`

Returns all indices of all values that cause the `fn` function to evaluate to true when evaluated on every item in `x`. Note that `x` can be an arbitrarily nested array _or_ an object.

## `int(x)`

Returns `x` converted to an integer.

## `intersect(a, b)`

Returns the intersection of `set(a)` and `set(b)`; i.e., the set of values that are in _both_ `a` and `b`. Note that `a` and `b` can be arbitrarily nested arrays containing any types of values.

## `inverse(x)`

Returns the inverse of a square matrix `x`.

## `isArray(x)`

Returns `true` if `x` is an array; otherwise, returns `false`.

## `isBoolean(x)`

Returns `true` if `x` is a boolean value; otherwise, returns `false`.

## `isDataFrame(x)`

Returns `true` if `x` is a `DataFrame`; otherwise, returns `false`.

## `isEqual(a, b)`

Returns `true` if `a` and `b` are equal; otherwise, returns `false`. Equality in the context of this function means that the two items are _functionally_ the same, even if they're not literally the same object in memory. For example:

```js
const a = { hello: "world" }
const b = { hello: "world" }
console.log(isEqual(a, b))
// true
```

In the above example, `a` and `b` are not literally the same object in memory, but they are nevertheless functionally equivalent; i.e., they have all the same properties.

## `isFunction(x)`

Returns `true` if `x` is a function; otherwise, returns `false`.

## `isJagged(x)`

Returns `true` if `x` is a jagged array; otherwise, returns `false`.

## `isNested(x)`

Returns `true` if `x` is a nested array; otherwise, returns `false`.

## `isNumber(x)`

Returns `true` if `x` is a number; otherwise, returns `false`.

## `isObject(x)`

Returns `true` if `x` is an object; otherwise, returns `false`. Weirdly, in JS, `null` is considered an object (which you can see for yourself with `typeof null`). But for the purposes of this function, `null` is _not_ considered to be an object in the usual sense; i.e., `isObject(null)` will return `false`.

## `isSeries(x)`

Returns `true` if `x` is a `Series`; otherwise, returns `false`.

## `isString(x)`

Returns `true` if `x` is a string; otherwise, returns `false`.

## `isUndefined(x)`

Returns `true` if `x` is undefined or null; otherwise, returns `false`. Note that NaN values are considered to be defined.

## `lerp(a, b, f)`

Returns the linear interpolation from `a` to `b` at fraction `f`. All of the arguments can be numbers or arbitrarily nested arrays of numbers, though `f` is typically in the range [0, 1].

## `log(x)`

Returns the natural log where `x` is a number or an arbitrarily nested array of numbers.

## `MathError(message)`

This class only exists because (1) I wanted to make it clear when errors where coming specifically from this library, and (2) I wanted to color-code the errors in the command line. Those are the only two ways in which `MathError` differs from `Error`.

## `max(x)`

Returns the maximum value in an arbitrarily nested array of numbers `x`.

## `mean(x)`

Returns the average value in an arbitrarily nested array of numbers `x`.

## `median(x)`

Returns the median value in an arbitrarily nested array of numbers `x`.

## `min(x)`

Returns the minimum value in an arbitrarily nested array of numbers `x`.

## `mode(x)`

Returns the mode(s) of an arbitrarily nested array of numbers `x`. If there are multiple modes, then an array will be returned; otherwise, a single number will be returned.

## `multiply(a, b)`

Returns the product of where `a` and `b` are numbers or arbitrarily nested arrays of numbers.

## `ndarray(shape)`

Returns an _n_-dimensional array where `shape` is an array of whole numbers. For example, `ndarray([5, 10])` would return a 5 ✕ 10 matrix.

## `normal(shape)`

Returns an _n_-dimensional array of normally-distributed random numbers where `shape` is undefined, null, or an array of whole numbers. If `shape` is undefined or null, then a single number will be returned; otherwise, an array will be returned.

## `ones(shape)`

Returns an _n_-dimensional array of 1s where `shape` is an array of whole numbers.

## `permutations(x, r)`

Given an arbitrarily nested array `x`, returns all possible permutations of `r` items from `x`. Note that any nesting of `x` will be ignored — i.e., `x` will be "flattened" into a 1-dimensional array before getting the permutations — so it won't be possible with this function to get permutations of arrays.

## `product(x)`

Returns the product of all of the values in arbitrarily nested array `x`.

## `pow(a, b)`

Returns `a` to the power of `b` where `a` and `b` are numbers or arbitrarily nested arrays of numbers.

## `print(x)`

Prints `x` to the console. For the most part, this function is basically the same as `console.log`. The only additional functionality it provides is printing `DataFrame` and `Series` objects nicely (most of the time).

## `random(shape)`

Returns an _n_-dimensional array of random numbers in the range [0, 1] where `shape` is undefined, null, or an array of whole numbers. If `shape` is undefined or null, then a single number will be returned; otherwise, an array will be returned.

## `range(a, b, step=1)`

Returns an array of numbers in the range [`a`, `b`) incremented by `step`.

## `remap(x, a, b, c, d)`

Returns `x` remapped from the range [`a`, `b`] to the range [`c`, `d`]. For example, `remap(2, 0, 10, 0, 100)` would return 20.

## `reshape(x, shape)`

Returns arbitrarily nested array `x` reshaped into shape `shape`.

## `reverse(x)`

Returns a reversed copy of array `x`. Only reverses at the shallowest level.

## `round(x)`

Returns the next lowest or highest integer when `x` is a number or an arbitrarily nested array of numbers.

## `scale(a, b)`

Identical to `multiply`.

## `seed(n)`

Seeds the PRNG with `n`, an integer.

## `Series(x)`

The `Series` class is similar to pandas' [`Series`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.html). They at least represent the same kind of data (named 1-dimensional arrays), though they probably differ in many of their members.

The constructor for a `Series` can optionally receive a value `x`, which can be any of these:

- another `Series`
- a 1-dimensional array
- an object whose lone key-value pair represents the name and values, respectively

### `Series.apply()`

### `Series.dropMissing()`

### `Series.dropNaN()`

### `Series.filter()`

### `Series.getSubsetByIndices()`

### `Series.getSubsetByNames()`

### `Series.get()`

### `Series.print()`

### `Series.sortByIndex()`

### `Series.sort()`

### `Series.toObject()`

## `set(x)`

Returns the unique values in arbitrarily nested array `x`.

## `setValueAt(x, index, value)`

Sets `value` at location `index` in arbitrarily nested array `x`. If `x` is 1-dimensional, then `index` can be a single whole number; otherwise, it needs to be an array of whole numbers.

## `shape(x)`

Returns the shape of arbitrarily nested array `x`.

## `shuffle(x)`

Returns a shuffled copy of arbitrarily nested array `x`. Note that only the shallowest level of `x` is shuffled.

## `sign(x)`

Returns -1, 0, or 1 if `x` is less than 0, equal to 0 or greater than 0, respectively. Note that `x` can be a number or an arbitrarily nested array of numbers.

## `sin(s)`

Returns the sine where `x` is a number or an arbitrarily nested array of numbers.

## `slice(x, indices)`

Returns a subset of arbitrarily nested array `x` identified by `indices`. Note that `indices` is an array that can contain three types of values:

- null / undefined
- a single whole number
- an array of whole numbers

Each value in `indices` represents item numbers along that dimension of `x`. For example, if `x` is a matrix, then `indices` would need to contain exactly two of the above value types: one for picking out rows, and one for picking out columns.

```js
const x = reshape(range(0, 100), [10, 10])
console.log(x)
// [
//   [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
//   [ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ],
//   [ 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 ],
//   [ 30, 31, 32, 33, 34, 35, 36, 37, 38, 39 ],
//   [ 40, 41, 42, 43, 44, 45, 46, 47, 48, 49 ],
//   [ 50, 51, 52, 53, 54, 55, 56, 57, 58, 59 ],
//   [ 60, 61, 62, 63, 64, 65, 66, 67, 68, 69 ],
//   [ 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 ],
//   [ 80, 81, 82, 83, 84, 85, 86, 87, 88, 89 ],
//   [ 90, 91, 92, 93, 94, 95, 96, 97, 98, 99 ]
// ]

const rows = range(5, 10)
const cols = range(4, 7)
const subset = slice(x, [rows, cols])
console.log(subset)
// [
//   [ 54, 55, 56 ],
//   [ 64, 65, 66 ],
//   [ 74, 75, 76 ],
//   [ 84, 85, 86 ],
//   [ 94, 95, 96 ]
// ]
```

## `sort(x, fn)`

Sorts arbitrarily nested array `x` by function `fn`. This function is identical to [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) except that it does _not_ sort `x` in-place; instead it returns a sorted copy of `x`.

## `sqrt(x)`

Returns the square root where `x` is a number or an arbitrarily nested array of numbers.

## `std(x)`

Returns the standard deviation where `x` is an arbitrarily nested array of numbers.

## `stdev(x)`

Identical to `std`.

## `subtract(a, b)`

Returns the difference where `a` and `b` are numbers or arbitrarily nested arrays of numbers. Note that `a` and `b` don't both have to be the same type; `a` could be a number while `b` could be an arbitrarily nested array of numbers, or vice versa.

## `sum(x)`

Returns the sum of all values in arbitrarily nested array `x`.

## `tan(x)`

Returns the tangent where `x` is a number or an arbitrarily nested array of numbers.

## `time(fn)`

Identical to `timeSync`.

## `timeSync(fn)`

Returns the time in milliseconds that it takes for synchronous function `fn` to run.

## `timeAsync(fn)`

Returns a `Promise` that resolves to the time in milliseconds that it takes for asynchronous function `fn` to run.

## `transpose(x)`

Returns the transpose of a vector or matrix `x`.

## `union(a, b)`

Returns the union of the set of values in `a` and the set of values in `b`.

## `variance(x)`

Returns the variance of the values in arbitrarily nested array `x`.

## `vectorize(fn)`

Returns a function that operates on individual values or arbitrarily nested arrays of values. It's a little like numpy's [`vectorize`](https://numpy.org/doc/stable/reference/generated/numpy.vectorize.html) function except that numpy probably has a bunch of fancy optimizations that make vectorized operations very fast. In this library, though, no optimizations are applied; this function merely makes it easier for individual functions to operate on arrays of data.

For example, the `Math.sin` function only accepts a single value. But by using the `vectorize` function, we can create a function that accepts either single values or arrays of values:

```js
const sin = vectorize(Math.sin)

console.log(sin(0))
// 0

const angles = [0, Math.PI / 4, Math.PI / 2]
console.log(sin(angles))
// [ 0, 0.7071067811865475, 1 ]
```

This also works when the function requires multiple arguments. For example, the `add` function in this library accepts two arguments and has been passed through the `vectorize` function so that it accepts individual values or arrays of values:

```js
console.log(add(2, 3))
// 5

console.log(add([2, 3, 4], [5, 6, 7]))
// [ 7, 9, 11 ]

console.log(add(2, [5, 6, 7]))
// [ 7, 8, 9 ]

console.log(add([2, 3, 4], 5))
// [ 7, 8, 9 ]
```

At the moment, though, the function is pretty naive about the _shapes_ of the arrays; e.g., it'll throw an error in the `add` function if both arguments are arrays of differing shapes.

## `where(x, fn)`

Returns an array of indices in `x` for which the function `fn` evaluates to true when evaluated on every item in `x`.

## `zeros(shape)`

Returns an _n_-dimensional array of 0s where `shape` is an array of whole numbers.

# Notes

## Jagged arrays

Note that for all of the above, "arbitrarily nested array" typically means a _non-jagged_ array. Jagged arrays (AKA "ragged" arrays) are arrays in which nested arrays have inconsistent lengths. For example, this — `[[1], [2, 3], [4, 5, 6]]` — would be a jagged array because the sub-arrays have lengths 1, 2, and 3 respectively. Many of the above functions expect non-jagged arrays. (Is there a technical term for non-jagged arrays? Maybe "even" arrays? Or "smooth" arrays? I'll go with "smooth" for now.) Some of them may not throw an error when passed a jagged array, though; they may quietly do their work and return an unexpected result. For example, the `dropNaN` function will happily drop NaN values from nested arrays, potentially leaving them jagged as a result. I've tried to let the functions operate this way when it's not strictly necessary for them to operate on smooth arrays. When a smooth array is required, an error should be thrown if the function receives a jagged array instead.

## Random numbers

The PRNG (pseudo-random number generator) implemented in this library uses the [xoroshiro256++](https://prng.di.unimi.it/) algorithm, in case that matters to you. To seed the PRNG, pass a number into the `seed` function. Large integers tend to do better than small ones. The `random`, `normal`, and `shuffle` functions can all be seeded. For example:

```js
const { random, seed } = require("js-math-tools")

seed(230498349)
random(5)
// [
//   0.018838884276985594,
//   0.5304929121766935,
//   0.7364885210604148,
//   0.005920131518888056,
//   0.8434281063536071
// ]

seed(230498349)
random(5)
// [
//   0.018838884276985594,
//   0.5304929121766935,
//   0.7364885210604148,
//   0.005920131518888056,
//   0.8434281063536071
// ]
```

Do be aware, though, that there's no such thing in this library as having multiple PRNGs at the same time, each with different seeds. Instead, all of the randomization functions share the same seeding because they all share the same core `random` function.

This is a little library of math tools for JS.

# Installation

```bash
npm install --save https://gitlab.com/jrc03c/js-math-tools
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
let tools = require("js-math-tools")
let add = tools.math.add
add(3, 4) // 7
```

Or, for easier access, you can "dump" all of the functions into the global scope:

```js
let tools = require("js-math-tools")
tools.dump()
add(3, 4) // 7
```

Most of the typical math functions (like sine, cosine, etc.) can take, individual numeric values, arrays of numbers, or a combination of numbers and arrays of numbers. For example, all of the following are acceptable:

```js
add(3, 4) // 7
add([2, 3, 4], [5, 6, 7]) // [7, 9, 11]
add([5, 10, 15], 10) // [15, 20, 25]
add(-7, [10, 11, 12]) // [3, 4, 5]
```

There's a handy helper function called `vectorize` that can turn any arbitrary function into a function that operates on these mixed types of parameters (individual values or arrays of the same types of values). For example:

```js
let tools = require("js-math-tools")
tools.dump()

function divide(a, b){
  return a / b
}

divide = vectorize(divide)

divide(10, 2) // 5
divide([20, 30, 40], 10) // [2, 3, 4]
divide(24, [6, 8, 12]) // [4, 3, 2]
divide([20, 30, 40], [40, 30, 20]) // [0.5, 1, 2]
```

# Arrays

Unlike some other JS math libraries, this library does _not_ provide a wrapper around standard JS arrays. Therefore, pretty much everything is handled through functions, not objects. Here are some examples of things you might want to do with (_n_-dimensional) arrays.

```js
let tools = require("js-math-tools")
tools.dump()

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

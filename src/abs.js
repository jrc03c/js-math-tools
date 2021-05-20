let assert = require("./assert.js")
let vectorize = require("./vectorize.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")

let abs = vectorize(function(x){
  try {
    if (typeof(x) === "boolean") return NaN
		return Math.abs(x)
	} catch(e) {
		return NaN
	}
})

module.exports = abs

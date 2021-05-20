let assert = require("./assert.js")
let vectorize = require("./vectorize.js")
let isNumber = require("./is-number.js")
let isString = require("./is-string.js")
let isUndefined = require("./is-undefined.js")

let add = vectorize(function(){
  try {
		let out
    let keys = Object.keys(arguments)

    for (let i=0; i<keys.length; i++){
      let key = keys[i]
      let value = arguments[key]
      if (typeof(value) !== "number") return NaN
			if (!out) out = value
			else out += arguments[key]
		}

		return out
	} catch(e) {
		return NaN
	}
})

module.exports = add

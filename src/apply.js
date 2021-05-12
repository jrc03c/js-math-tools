let vectorize = require("./vectorize.js")

let apply = vectorize(function(x, fn){
  try {
		return fn(x)
	} catch(e) {
		return NaN
	}
})

module.exports = apply

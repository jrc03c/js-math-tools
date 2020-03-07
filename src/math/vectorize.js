let isArray = require("./is-array.js")

function vectorize(fn){
  return function temp(){
    if (Object.keys(arguments).map(key => isArray(arguments[key])).indexOf(true) > -1){
      let out = []
      let lengths = Object.keys(arguments).filter(key => isArray(arguments[key])).map(key => arguments[key].length)

      let maxLength = lengths.sort(function(a, b){
        if (a > b) return -1
        if (a < b) return 1
        return 0
      })[0]

      for (let i=0; i<maxLength; i++){
        let args = Object.keys(arguments).map(key => {
          if (isArray(arguments[key])) return arguments[key][i]
          return arguments[key]
        })
        out.push(temp(...args))
      }

      return out
    } else {
      return fn(...arguments)
    }
  }
}

module.exports = vectorize

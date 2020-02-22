let isArray = require("./is-array.js")
let max = require("./max.js")

function vectorize(fn){
  return function temp(){
    if (Object.keys(arguments).map(key => isArray(arguments[key])).indexOf(true) > -1){
      let out = []
      let maxLength = max(Object.keys(arguments).filter(key => isArray(arguments[key])).map(key => arguments[key].length))

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

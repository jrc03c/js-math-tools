(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  downloadCanvas: require("./download-canvas.js"),
  Plot: require("./plot.js"),
}

},{"./download-canvas.js":2,"./plot.js":3}],2:[function(require,module,exports){
function downloadCanvas(canvas, filename){
  let a = document.createElement("a")
  a.href = canvas.toDataURL()
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadCanvas

},{}],3:[function(require,module,exports){
function Plot(canvas){
  let self = this

  let xmin = -1
  let xmax = 1
  let ymin = -1
  let ymax = 1
  let fillColor = "black"
  let strokeColor = "black"
  let dotSize = 5
  let lineThickness = 1
  let axesAreVisible = true
  let textStyle = {
    family: "monospace",
    size: 12,
    alignment: "center",
    baseline: "middle",
    isBold: false,
    isItalicized: false,
    lineHeight: 14,
    color: "black",
  }

  let context = canvas.getContext("2d")
  let width = canvas.width
  let height = canvas.height

  self.setOpacity = function(a){
    context.globalAlpha = a
  }

  self.setFillColor = function(c){
    fillColor = c
    return self
  }

  self.setLineColor = function(c){
    strokeColor = c
    return self
  }

  self.setDotSize = function(s){
    dotSize = s
    return self
  }

  self.setLineThickness = function(t){
    lineThickness = t
    return self
  }

  self.setAxesAreVisible = function(v){
    axesAreVisible = v
    return self
  }

  self.setTextStyle = function(t){
    textStyle = t
  }

  self.setRange = function(a, b, c, d){
    xmin = a
    xmax = b
    ymin = c
    ymax = d
    return self
  }

  self.splitTextIntoLines = function(text, maxWidth){
    let lines = []
    let words = text.split(" ")
    let temp = ""

    words.forEach(function(word){
      let width = context.measureText(temp + " " + word).width

      if (width > maxWidth){
        lines.push(temp)
        temp = word
      } else {
        temp += " " + word
      }
    })

    if (temp.length > 0){
      lines.push(temp)
    }

    return lines
  }

  self.clear = function(){
    context.clearRect(0, 0, width, height)
    context.fillStyle = "white"
    context.fillRect(0, 0, width, height)
  }

  self.drawAxes = function(){
    if (axesAreVisible){
      context.fillStyle = "none"
      context.strokeStyle = "black"
      context.lineWidth = 1

      context.beginPath()
      context.moveTo(-width/2, map(0, ymin, ymax, -height/2, height/2))
      context.lineTo(width/2, map(0, ymin, ymax, -height/2, height/2))
      context.stroke()

      context.beginPath()
      context.moveTo(map(0, xmin, xmax, -width/2, width/2), -height/2)
      context.lineTo(map(0, xmin, xmax, -width/2, width/2), height/2)
      context.stroke()
    }

    return self
  }

  self.scatter = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length; i++){
      xTemp = map(x[i], xmin, xmax, -width/2, width/2)
      yTemp = map(y[i], ymin, ymax, -height/2, height/2)

      context.beginPath()
      context.ellipse(xTemp, yTemp, dotSize / 2, dotSize / 2, 0, 0, Math.PI * 2)
      if (fillColor !== "none") context.fill()
      if (lineThickness > 0) context.stroke()
    }

    context.restore()
    return self
  }

  self.line = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length-1; i++){
      xTemp1 = map(x[i], xmin, xmax, -width/2, width/2)
      yTemp1 = map(y[i], ymin, ymax, -height/2, height/2)
      xTemp2 = map(x[i+1], xmin, xmax, -width/2, width/2)
      yTemp2 = map(y[i+1], ymin, ymax, -height/2, height/2)

      context.beginPath()
      context.moveTo(xTemp1, yTemp1)
      context.lineTo(xTemp2, yTemp2)
      context.stroke()
    }

    context.restore()
    return self
  }

  self.dottedLine = function(x, y){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    self.drawAxes()

    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    for (let i=0; i<x.length-1; i+=2){
      try {
        xTemp1 = map(x[i], xmin, xmax, -width/2, width/2)
        yTemp1 = map(y[i], ymin, ymax, -height/2, height/2)
        xTemp2 = map(x[i+1], xmin, xmax, -width/2, width/2)
        yTemp2 = map(y[i+1], ymin, ymax, -height/2, height/2)

        context.beginPath()
        context.moveTo(xTemp1, yTemp1)
        context.lineTo(xTemp2, yTemp2)
        context.stroke()
      } catch(e){}
    }

    context.restore()
    return self
  }

  self.bar = function(values, colors){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    let barThickness = 0.5

    for (let i=0; i<values.length; i++){
      context.fillStyle = colors[i]

      let xTemp = map((i + 2) - barThickness / 2, xmin, xmax, -width/2, width/2)
      let yTemp = map(0, ymin, ymax, -height/2, height/2)
      let wTemp = map(barThickness, 0, xmax - xmin, 0, width)
      let hTemp = map(values[i], 0, ymax - ymin, 0, height)

      if (colors[i] !== "none") context.fillRect(xTemp, yTemp, wTemp, hTemp)
      if (lineThickness > 0) context.strokeRect(xTemp, yTemp, wTemp, hTemp)
    }

    self.drawAxes()
    context.restore()
    return self
  }

  self.text = function(text, x, y, maxWidth){
    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)

    context.fillStyle = textStyle.color
    context.font = `${textStyle.isBold ? "bold" : ""} ${textStyle.isItalicized ? "italic" : ""} ${textStyle.size}px ${textStyle.family}`
    context.textAlign = textStyle.alignment
    context.textBaseline = textStyle.baseline

    let lines

    if (maxWidth){
      lines = self.splitTextIntoLines(text, map(maxWidth, 0, xmax - xmin, 0, width))
    } else {
      lines = [text]
    }

    lines.forEach(function(line, index){
      context.save()
      context.translate(map(x, xmin, xmax, -width/2, width/2), map(y, ymin, ymax, -height/2, height/2) - index * textStyle.lineHeight)
      context.scale(1, -1)
      context.fillText(line, 0, 0)
      context.restore()
    })

    context.restore()
    return self
  }

  self.getContext = function(){
    return context
  }

  self.download = function(filename){
    downloadCanvas(canvas, filename)
    return self
  }
}

module.exports = Plot

},{}],4:[function(require,module,exports){
module.exports = {
  canvas: require("./canvas/__index__.js"),
  math: require("./math/__index__.js"),
  misc: require("./misc/__index__.js"),
}

},{"./canvas/__index__.js":1,"./math/__index__.js":5,"./misc/__index__.js":36}],5:[function(require,module,exports){
module.exports = {
  abs: require("./abs.js"),
  ceil: require("./ceil.js"),
  clamp: require("./clamp.js"),
  cohensd: require("./cohens-d.js"),
  correl: require("./correl.js"),
  cos: require("./cos.js"),
  covariance: require("./covariance.js"),
  floor: require("./floor.js"),
  isArray: require("./is-array.js"),
  lerp: require("./lerp.js"),
  map: require("./map.js"),
  max: require("./max.js"),
  mean: require("./mean.js"),
  min: require("./min.js"),
  ndarray: require("./ndarray.js"),
  normal: require("./normal.js"),
  normalize: require("./normalize.js"),
  ones: require("./ones.js"),
  pow: require("./pow.js"),
  range: require("./range.js"),
  round: require("./round.js"),
  sign: require("./sign.js"),
  sin: require("./sin.js"),
  sqrt: require("./sqrt.js"),
  std: require("./std.js"),
  sum: require("./sum.js"),
  tan: require("./tan.js"),
  variance: require("./variance.js"),
  vectorize: require("./vectorize.js"),
  zeros: require("./zeros.js"),
}

},{"./abs.js":6,"./ceil.js":7,"./clamp.js":8,"./cohens-d.js":9,"./correl.js":10,"./cos.js":11,"./covariance.js":12,"./floor.js":13,"./is-array.js":14,"./lerp.js":15,"./map.js":16,"./max.js":17,"./mean.js":18,"./min.js":19,"./ndarray.js":20,"./normal.js":21,"./normalize.js":22,"./ones.js":23,"./pow.js":24,"./range.js":25,"./round.js":26,"./sign.js":27,"./sin.js":28,"./sqrt.js":29,"./std.js":30,"./sum.js":31,"./tan.js":32,"./variance.js":33,"./vectorize.js":34,"./zeros.js":35}],6:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let abs = vectorize(Math.abs)
module.exports = abs

},{"./vectorize.js":34}],7:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let ceil = vectorize(Math.ceil)
module.exports = ceil

},{"./vectorize.js":34}],8:[function(require,module,exports){
let isArray = require("./is-array.js")

function clamp(x, a, b){
  if (isArray(x)) return x.map(v => clamp(v, a, b))
  if (x < a) return a
  if (x > b) return b
  return x
}

module.exports = clamp

},{"./is-array.js":14}],9:[function(require,module,exports){
let mean = require("./mean.js")
let sqrt = require("./sqrt.js")
let variance = require("./variance.js")

function cohensd(arr1, arr2){
  let m1 = mean(arr1)
  let m2 = mean(arr2)
  let s = sqrt((variance(arr1) + variance(arr2)) / 2)
  return (m1 - m2) / s
}

module.exports = cohensd

},{"./mean.js":18,"./sqrt.js":29,"./variance.js":33}],10:[function(require,module,exports){
let covariance = require("./covariance.js")
let std = require("./std.js")

function correl(x, y){
  return covariance(x, y) / (std(x) * std(y))
}

module.exports = correl

},{"./covariance.js":12,"./std.js":30}],11:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let cos = vectorize(Math.cos)
module.exports = cos

},{"./vectorize.js":34}],12:[function(require,module,exports){
let mean = require("./mean.js")

function covariance(x, y){
  let mx = mean(x)
  let my = mean(y)
  let out = 0
  for (let i=0; i<x.length; i++) out += (x[i] - mx) * (y[i] - my)
  return out / x.length
}

module.exports = covariance

},{"./mean.js":18}],13:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let floor = vectorize(Math.floor)
module.exports = floor

},{"./vectorize.js":34}],14:[function(require,module,exports){
function isArray(obj){
  return obj.push ? true : false
}

module.exports = isArray

},{}],15:[function(require,module,exports){
function lerp(a, b, f){
  return f * (b - a) + a
}

module.exports = lerp

},{}],16:[function(require,module,exports){
let isArray = require("./is-array.js")

function map(x, a, b, c, d){
  if (isArray(x)) return x.map(v => map(v, a, b, c, d))
  return (d - c) * (x - a) / (b - a) + c
}

module.exports = map

},{"./is-array.js":14}],17:[function(require,module,exports){
function max(arr){
  let out

  arr.forEach(function(x){
    if (out === undefined || x > out){
      out = x
    }
  })

  return out
}

module.exports = max

},{}],18:[function(require,module,exports){
let sum = require("./sum.js")

function mean(arr){
  return sum(arr) / arr.length
}

module.exports = mean

},{"./sum.js":31}],19:[function(require,module,exports){
function min(arr){
  let out

  arr.forEach(function(x){
    if (out === undefined || x < out){
      out = x
    }
  })

  return out
}

module.exports = min

},{}],20:[function(require,module,exports){
let isArray = require("./is-array.js")
let range = require("./range.js")

function ndarray(shape){
  if (!isArray(shape)) shape = [shape]

  if (shape.length === 1){
    return range(0, shape[0]).map(v => 0)
  } else {
    let out = []
    for (let i=0; i<shape[0]; i++) out.push(ndarray(shape.slice(1, shape.length)))
    return out
  }
}

module.exports = ndarray

},{"./is-array.js":14,"./range.js":25}],21:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function normal(shape){
  function n(){
    let u1 = Math.random()
    let u2 = Math.random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  return apply(ndarray(shape), n)
}

module.exports = normal

},{"../misc/apply.js":37,"./ndarray.js":20}],22:[function(require,module,exports){
let min = require("./min.js")
let max = require("./max.js")

function normalize(arr){
  let arrMin = min(arr)
  let arrMax = max(arr)
  let arrRange = arrMax - arrMin
  return arr.map(v => (v - arrMin) / arrRange)
}

module.exports = normalize

},{"./max.js":17,"./min.js":19}],23:[function(require,module,exports){
let ndarray = require("./ndarray.js")

function ones(shape){
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

},{"./ndarray.js":20}],24:[function(require,module,exports){
let isArray = require("./is-array.js")

function pow(x, p){
  if (isArray(x)) return x.map(v => pow(v, p))
  return Math.pow(x, p)
}

module.exports = pow

},{"./is-array.js":14}],25:[function(require,module,exports){
function range(a, b, step=1){
  let out = []
  for (let i=a; i<b; i+=step) out.push(i)
  return out
}

module.exports = range

},{}],26:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let round = vectorize(Math.round)
module.exports = round

},{"./vectorize.js":34}],27:[function(require,module,exports){
let vectorize = require("./vectorize.js")

let sign = vectorize(function(x){
  if (x < 0) return -1
  if (x > 1) return 1
  return 0
})

module.exports = sign

},{"./vectorize.js":34}],28:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let sin = vectorize(Math.sin)
module.exports = sin

},{"./vectorize.js":34}],29:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let sqrt = vectorize(Math.sqrt)
module.exports = sqrt

},{"./vectorize.js":34}],30:[function(require,module,exports){
let mean = require("./mean.js")
let pow = require("./pow.js")
let sqrt = require("./sqrt.js")

function std(arr){
  let m = mean(arr)
  let out = 0
  arr.forEach(x => out += pow(x - m, 2))
  return sqrt(out / arr.length)
}

module.exports = std

},{"./mean.js":18,"./pow.js":24,"./sqrt.js":29}],31:[function(require,module,exports){
function sum(arr){
  let out = 0
  arr.forEach(v => out += v)
  return out
}

module.exports = sum

},{}],32:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let tan = vectorize(Math.tan)
module.exports = tan

},{"./vectorize.js":34}],33:[function(require,module,exports){
let pow = require("./pow.js")
let std = require("./std.js")

function variance(arr){
  return pow(std(arr), 2)
}

module.exports = variance

},{"./pow.js":24,"./std.js":30}],34:[function(require,module,exports){
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

},{"./is-array.js":14,"./max.js":17}],35:[function(require,module,exports){
let ndarray = require("./ndarray.js")

function zeros(shape){
  return ndarray(shape)
}

module.exports = zeros

},{"./ndarray.js":20}],36:[function(require,module,exports){
module.exports = {
  apply: require("./apply.js"),
  array: require("./array.js"),
  pause: require("./pause.js"),
  print: require("./print.js"),
}

},{"./apply.js":37,"./array.js":38,"./pause.js":39,"./print.js":40}],37:[function(require,module,exports){
let vectorize = require("../math/vectorize.js")

let apply = vectorize(function(x, fn){
  return fn(x)
})

module.exports = apply

},{"../math/vectorize.js":34}],38:[function(require,module,exports){
Array.prototype.asyncForEach = async function(fn){
  for (let i=0; i<this.length; i++) await fn(this[i], i, this)
  return this
}

Array.prototype.alphaSort = function(key){
  return this.sort(function(a, b){
    if (key){
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    } else {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    }
  })
}

},{}],39:[function(require,module,exports){
function pause(ms){
  return new Promise(function(resolve, reject){
    try {
      return setTimeout(resolve, ms)
    } catch(e){
      return reject(e)
    }
  })
}

module.exports = pause

},{}],40:[function(require,module,exports){
function print(x){
  return console.log(x)
}

module.exports = print

},{}]},{},[4]);

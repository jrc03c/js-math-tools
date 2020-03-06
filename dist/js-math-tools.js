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
let map = require("../math/map.js")
let downloadCanvas = require("./download-canvas.js")

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

},{"../math/map.js":21,"./download-canvas.js":2}],4:[function(require,module,exports){
let out = {
  canvas: require("./canvas/__index__.js"),
  math: require("./math/__index__.js"),
  misc: require("./misc/__index__.js"),
}

try {
  module.exports = out
} catch(e){}

try {
  window.JSMathTools = out
} catch(e){}

},{"./canvas/__index__.js":1,"./math/__index__.js":5,"./misc/__index__.js":43}],5:[function(require,module,exports){
module.exports = {
  abs: require("./abs.js"),
  add: require("./add.js"),
  ceil: require("./ceil.js"),
  clamp: require("./clamp.js"),
  cohensd: require("./cohens-d.js"),
  correl: require("./correl.js"),
  cos: require("./cos.js"),
  covariance: require("./covariance.js"),
  floor: require("./floor.js"),
  isArray: require("./is-array.js"),
  isNumber: require("./is-number.js"),
  isString: require("./is-string.js"),
  isUndefined: require("./is-undefined.js"),
  lerp: require("./lerp.js"),
  log: require("./log.js"),
  map: require("./map.js"),
  max: require("./max.js"),
  mean: require("./mean.js"),
  min: require("./min.js"),
  ndarray: require("./ndarray.js"),
  normal: require("./normal.js"),
  normalize: require("./normalize.js"),
  ones: require("./ones.js"),
  pow: require("./pow.js"),
  random: require("./random.js"),
  range: require("./range.js"),
  round: require("./round.js"),
  scale: require("./scale.js"),
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

},{"./abs.js":6,"./add.js":7,"./ceil.js":8,"./clamp.js":9,"./cohens-d.js":10,"./correl.js":11,"./cos.js":12,"./covariance.js":13,"./floor.js":14,"./is-array.js":15,"./is-number.js":16,"./is-string.js":17,"./is-undefined.js":18,"./lerp.js":19,"./log.js":20,"./map.js":21,"./max.js":22,"./mean.js":23,"./min.js":24,"./ndarray.js":25,"./normal.js":26,"./normalize.js":27,"./ones.js":28,"./pow.js":29,"./random.js":30,"./range.js":31,"./round.js":32,"./scale.js":33,"./sign.js":34,"./sin.js":35,"./sqrt.js":36,"./std.js":37,"./sum.js":38,"./tan.js":39,"./variance.js":40,"./vectorize.js":41,"./zeros.js":42}],6:[function(require,module,exports){
let assert = require("../misc/assert.js")
let vectorize = require("./vectorize.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")

let abs = vectorize(function(x){
  assert(!isUndefined(x), "You must pass exactly one number into the `abs` function!")
  assert(isNumber(x), "The `abs` function only works on numbers!")
  return Math.abs(x)
})

module.exports = abs

// tests
if (!module.parent){
  let result = abs(3)
  assert(result === 3, `abs(3) should be 3, but instead is ${result}!`)

  result = abs(-3)
  assert(result === 3, `abs(-3) should be 3, but instead is ${result}!`)

  result = abs(17.25)
  assert(result === 17.25, `abs(17.25) should be 17.25, but instead is ${result}!`)

  result = abs(-101.5)
  assert(result === 101.5, `abs(-101.5) should be 101.5, but instead is ${result}!`)

  x = [-2, 3, -4]
  yTrue = [2, 3, 4]
  yPred = abs(x)

  for (let i=0; i<yTrue.length; i++){
    assert(yTrue[i] === yPred[i], `abs(${x[i]}) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)
  }

  x = [
    [1, -2, -3],
    [4, -5, 6],
    [-7, 8, -9],
  ]

  yTrue = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]

  yPred = abs(x)

  for (let r=0; r<yTrue.length; r++){
    for (let c=0; c<yTrue[r].length; c++){
      assert(yTrue[r][c] === yPred[r][c], `abs(${x[r][c]}) should be ${yTrue[r][c]}, but instead is ${yPred[r][c]}!`)
    }
  }

  let hasFailed = false

  try {
    abs("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs("foo") should have failed!`)

  hasFailed = false

  try {
    abs(["foo", "bar", "baz"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(["foo", "bar", "baz"]) should have failed!`)

  hasFailed = false

  try {
    abs({x: 5})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs({x: 5}) should have failed!`)

  hasFailed = false

  try {
    abs(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(true) should have failed!`)

  hasFailed = false
  let foo

  try {
    abs(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":46,"./is-array.js":15,"./is-number.js":16,"./is-undefined.js":18,"./vectorize.js":41}],7:[function(require,module,exports){
let assert = require("../misc/assert.js")
let vectorize = require("./vectorize.js")
let isNumber = require("./is-number.js")
let isString = require("./is-string.js")
let isUndefined = require("./is-undefined.js")

let add = vectorize(function(){
  let out = 0
  let argKeys = Object.keys(arguments)
  let argValues = argKeys.map(key => arguments[key])
  let argTypes = argValues.map(value => typeof(value))

  argValues.forEach(value => assert(isNumber(value) || isString(value), "The `add` function only works on strings or numbers!"))

  argValues.forEach(value => assert(!isUndefined(value), "The arguments for the `add` function cannot be undefined!"))

  if (argTypes.indexOf("string") > -1) out = ""

  argValues.forEach(x => out += x)

  return out
})

module.exports = add

// tests
if (!module.parent){
  let a = 3
  let b = 4
  cTrue = a + b
  cPred = add(a, b)
  assert(cTrue === cPred, `add(${a}, ${b}) should be ${cTrue}, but instead is ${cPred}!`)

  a = -4
  b = 22.5
  cTrue = a + b
  cPred = add(a, b)
  assert(cTrue === cPred, `add(${a}, ${b}) should be ${cTrue}, but instead is ${cPred}!`)

  a = [2, 3, 4]
  b = -10
  cTrue = [-8, -7, -6]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = -10
  b = [2, 3, 4]
  cTrue = [-8, -7, -6]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = [2, 3, 4]
  b = [5, 6, 7]
  cTrue = [7, 9, 11]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = [[2, 3, 4], [5, 6, 7]]
  b = 10
  cTrue = [[12, 13, 14], [15, 16, 17]]
  cPred = add(a, b)

  for (let row=0; row<cTrue.length; row++){
    for (let col=0; col<cTrue[row].length; col++){
      assert(cTrue[row][col] === cPred[row][col], `add(${a[row][col]}, ${b}) should be ${cTrue[row][col]}, but instead is ${cPred[row][col]}!`)
    }
  }

  a = [[2, 3, 4], [5, 6, 7]]
  b = [10, 20, 30]
  let hasFailed = false

  try {
    add(a, b)
  } catch(e){
    hasFailed = true
  }

  if (!hasFailed) assert(false, `add(${a}, ${b}) should have failed!`)

  a = "hello, "
  b = ["foo", "bar", "baz"]
  cTrue = ["hello, foo", "hello, bar", "hello, baz"]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a}, ${b[i]}) should be ${cTrue[i]}, but instead is ${cPred[i]}!`)

  a = true
  b = 3
  hasFailed = false

  try {
    add(a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add(${a}, ${b}) should have failed!`)

  a = [2, 3, 4]
  b = [5, 6, "seven"]
  cTrue = [7, 9, "4seven"]
  cPred = add(a, b)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `add(${a[i]}, ${b[i]}) should be ${cTrue[i]}, but instead was ${cPred[i]}!`)

  hasFailed = false
  let foo

  try {
    add(3, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add(3, foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":46,"./is-number.js":16,"./is-string.js":17,"./is-undefined.js":18,"./vectorize.js":41}],8:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let ceil = vectorize(function(x){
  assert(!isUndefined(x), "You must pass exactly one number into the `ceil` function!")
  assert(isNumber(x), "The `ceil` function only works on numbers!")
  return Math.ceil(x)
})

module.exports = ceil

// tests
if (!module.parent){
  let x = 3.5
  let yTrue = 4
  let yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 3.25
  yTrue = 4
  yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = -17.2
  yTrue = -17
  yPred = ceil(x)
  assert(yTrue === yPred, `ceil(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [2.5, 3.4, 7.9]
  yTrue = [3, 4, 8]
  yPred = ceil(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `ceil(${x[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed = false
  x = "foo"

  try {
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  hasFailed = false
  x = [true, 2, 3]

  try {
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  hasFailed = false
  x = {x: 5}

  try {
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  hasFailed = false
  let foo

  try {
    ceil(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":46,"./is-number.js":16,"./is-undefined.js":18,"./vectorize.js":41}],9:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let clamp = vectorize(function(x, a, b){
  assert(!isUndefined(x) && !isUndefined(a) && !isUndefined(b), "The arguments to the `clamp` function cannot be undefined!")

  assert(isNumber(x), "The `clamp` function only works on numbers!")
  assert(isNumber(a), "The `clamp` function only works on numbers!")
  assert(isNumber(b), "The `clamp` function only works on numbers!")

  assert(a < b, `The minimum parameter, a, must be less than the maximum parameter, b.`)

  if (x < a) return a
  if (x > b) return b
  return x
})

module.exports = clamp

// tests
if (!module.parent){
  let x = 5
  let a = 1
  let b = 10
  let yTrue = 5
  let yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = -100
  a = 1
  b = 10
  yTrue = a
  yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 999
  a = 1
  b = 10
  yTrue = b
  yPred = clamp(x, a, b)
  assert(yTrue === yPred, `clamp(${x}, ${a}, ${b}) should be ${yTrue}, but instead is ${yPred}!`)

  x = [0, 100, 1000]
  a = 5
  b = 500
  yTrue = [5, 100, 500]
  yPred = clamp(x, a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `clamp(${x[i]}, ${a}, ${b}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = [0, 100, 1000]
  a = [5, 10, 15]
  b = [100, 200, 300]
  yTrue = [5, 100, 300]
  yPred = clamp(x, a, b)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `clamp(${x[i]}, ${a[i]}, ${b[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}.`)

  x = 5
  a = 10
  b = 1
  let hasFailed = false

  try {
    clamp(x, a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(${x}, ${a}, ${b}) should have failed!`)

  x = "foo"
  a = "bar"
  b = "baz"
  hasFailed = false

  try {
    clamp(x, a, b)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(${x}, ${a}, ${b}) should have failed!`)

  let foo
  hasFailed = false

  try {
    clamp(foo, foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `clamp(foo, foo, foo) should have failed!`)
  
  console.log("All tests passed!")
}

},{"../misc/assert.js":46,"./is-number.js":16,"./is-undefined.js":18,"./vectorize.js":41}],10:[function(require,module,exports){
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

},{"./mean.js":23,"./sqrt.js":36,"./variance.js":40}],11:[function(require,module,exports){
let covariance = require("./covariance.js")
let std = require("./std.js")

function correl(x, y){
  return covariance(x, y) / (std(x) * std(y))
}

module.exports = correl

},{"./covariance.js":13,"./std.js":37}],12:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let cos = vectorize(Math.cos)
module.exports = cos

},{"./vectorize.js":41}],13:[function(require,module,exports){
let mean = require("./mean.js")

function covariance(x, y){
  let mx = mean(x)
  let my = mean(y)
  let out = 0
  for (let i=0; i<x.length; i++) out += (x[i] - mx) * (y[i] - my)
  return out / x.length
}

module.exports = covariance

},{"./mean.js":23}],14:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let floor = vectorize(Math.floor)
module.exports = floor

},{"./vectorize.js":41}],15:[function(require,module,exports){
function isArray(obj){
  return obj.push ? true : false
}

module.exports = isArray

},{}],16:[function(require,module,exports){
let assert = require("../misc/assert.js")

function isNumber(x){
  return typeof(x) === "number"
}

module.exports = isNumber

// tests
if (!module.parent){
  assert(isNumber(3), `3 is a number!`)
  assert(isNumber(-3.5), `-3.5 is a number!`)
  assert(isNumber(2573.2903482093482035023948, `2573.2903482093482035023948 is a number!`))
  assert(!isNumber("35"), `"35" is not a number!`)
  assert(!isNumber("foo"), `"foo" is not a number!`)
  assert(!isNumber([2, 3, 4]), `[2, 3, 4] is not a number!`)
  assert(!isNumber({x: 5}), "{x: 5} is not a number!")
  assert(!isNumber(true), `true is not a number!`)
  assert(!isNumber(false), `false is not a number!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":46}],17:[function(require,module,exports){
let assert = require("../misc/assert.js")

function isString(s){
  return typeof(s) === "string"
}

module.exports = isString

// tests
if (!module.parent){
  assert(isString("hi"), `"hi" is a string!`)
  assert(isString(""), `"" is a string!`)
  assert(isString(``), `\`\` is a string!`)
  assert(isString('foo', `'foo' is a string!`))
  assert(!isString(3), `3 is not a string!`)
  assert(!isString(true), `true is not a string!`)
  assert(!isString(false), `false is not a string!`)
  assert(!isString({x: 5}), `{x: 5} is not a string!`)
  assert(!isString(["a", "b", "c"]), `["a", "b", "c"] is not a string!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":46}],18:[function(require,module,exports){
let assert = require("../misc/assert.js")

function isUndefined(x){
  return x === null || typeof(x) === "undefined"
}

module.exports = isUndefined

// tests
if (!module.parent){
  assert(!isUndefined("foo"), `isUndefined("foo") should be false, but instead was true!`)
  assert(!isUndefined({}), `isUndefined({}) should be false, but instead was true!`)
  assert(!isUndefined(3), `isUndefined(3) should be false, but instead was true!`)
  assert(!isUndefined([]), `isUndefined([]) should be false, but instead was true!`)
  assert(!isUndefined(true), `isUndefined(true) should be false, but instead was true!`)
  assert(!isUndefined(false), `isUndefined(false) should be false, but instead was true!`)
  assert(!isUndefined(() => {}), `isUndefined(() => {}) should be false, but instead was true!`)

  let x
  assert(isUndefined(x), `isUndefined(x) should be true, but instead was false!`)

  let hasFailed = false

  try {
    isUndefined(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `isUndefined(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":46}],19:[function(require,module,exports){
function lerp(a, b, f){
  return f * (b - a) + a
}

module.exports = lerp

},{}],20:[function(require,module,exports){
let vectorize = require("./vectorize.js")

let log = vectorize(function(x, base){
  base = typeof(base) === "undefined" ? Math.E : base
  return Math.log(x) / Math.log(base)
})

module.exports = log

},{"./vectorize.js":41}],21:[function(require,module,exports){
let isArray = require("./is-array.js")

function map(x, a, b, c, d){
  if (isArray(x)) return x.map(v => map(v, a, b, c, d))
  return (d - c) * (x - a) / (b - a) + c
}

module.exports = map

},{"./is-array.js":15}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
let sum = require("./sum.js")

function mean(arr){
  return sum(arr) / arr.length
}

module.exports = mean

},{"./sum.js":38}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"./is-array.js":15,"./range.js":31}],26:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function normal(shape){
  function n(){
    let u1 = Math.random()
    let u2 = Math.random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  if (!shape) return n()
  return apply(ndarray(shape), n)
}

module.exports = normal

},{"../misc/apply.js":44,"./ndarray.js":25}],27:[function(require,module,exports){
let min = require("./min.js")
let max = require("./max.js")

function normalize(arr){
  let arrMin = min(arr)
  let arrMax = max(arr)
  let arrRange = arrMax - arrMin
  return arr.map(v => (v - arrMin) / arrRange)
}

module.exports = normalize

},{"./max.js":22,"./min.js":24}],28:[function(require,module,exports){
let ndarray = require("./ndarray.js")

function ones(shape){
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

},{"./ndarray.js":25}],29:[function(require,module,exports){
let isArray = require("./is-array.js")

function pow(x, p){
  if (isArray(x)) return x.map(v => pow(v, p))
  return Math.pow(x, p)
}

module.exports = pow

},{"./is-array.js":15}],30:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function random(shape){
  if (!shape) return Math.random()
  return apply(ndarray(shape), Math.random)
}

module.exports = random

},{"../misc/apply.js":44,"./ndarray.js":25}],31:[function(require,module,exports){
function range(a, b, step=1){
  let out = []
  for (let i=a; i<b; i+=step) out.push(i)
  return out
}

module.exports = range

},{}],32:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let round = vectorize(Math.round)
module.exports = round

},{"./vectorize.js":41}],33:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let scale = vectorize((a, b) => a * b)
module.exports = scale

},{"./vectorize.js":41}],34:[function(require,module,exports){
let vectorize = require("./vectorize.js")

let sign = vectorize(function(x){
  if (x < 0) return -1
  if (x > 1) return 1
  return 0
})

module.exports = sign

},{"./vectorize.js":41}],35:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let sin = vectorize(Math.sin)
module.exports = sin

},{"./vectorize.js":41}],36:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let sqrt = vectorize(Math.sqrt)
module.exports = sqrt

},{"./vectorize.js":41}],37:[function(require,module,exports){
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

},{"./mean.js":23,"./pow.js":29,"./sqrt.js":36}],38:[function(require,module,exports){
function sum(arr){
  let out = 0
  arr.forEach(v => out += v)
  return out
}

module.exports = sum

},{}],39:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let tan = vectorize(Math.tan)
module.exports = tan

},{"./vectorize.js":41}],40:[function(require,module,exports){
let pow = require("./pow.js")
let std = require("./std.js")

function variance(arr){
  return pow(std(arr), 2)
}

module.exports = variance

},{"./pow.js":29,"./std.js":37}],41:[function(require,module,exports){
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

},{"./is-array.js":15,"./max.js":22}],42:[function(require,module,exports){
let ndarray = require("./ndarray.js")

function zeros(shape){
  return ndarray(shape)
}

module.exports = zeros

},{"./ndarray.js":25}],43:[function(require,module,exports){
module.exports = {
  apply: require("./apply.js"),
  array: require("./array.js"),
  assert: require("./assert.js"),
  downloadJSON: require("./download-json.js"),
  pause: require("./pause.js"),
  print: require("./print.js"),
}

},{"./apply.js":44,"./array.js":45,"./assert.js":46,"./download-json.js":47,"./pause.js":48,"./print.js":49}],44:[function(require,module,exports){
let vectorize = require("../math/vectorize.js")

let apply = vectorize(function(x, fn){
  return fn(x)
})

module.exports = apply

},{"../math/vectorize.js":41}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
module.exports = function(isTrue, message){
  if (!isTrue) throw new Error(message)
}

},{}],47:[function(require,module,exports){
function downloadJSON(obj, filename){
  let a = document.createElement("a")
  a.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, "\t"))}`
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadJSON

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
function print(x){
  return console.log(x)
}

module.exports = print

},{}]},{},[4]);

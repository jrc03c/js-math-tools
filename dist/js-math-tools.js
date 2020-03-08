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

},{"../math/map.js":25,"./download-canvas.js":2}],4:[function(require,module,exports){
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

},{"./canvas/__index__.js":1,"./math/__index__.js":5,"./misc/__index__.js":53}],5:[function(require,module,exports){
module.exports = {
  abs: require("./abs.js"),
  add: require("./add.js"),
  ceil: require("./ceil.js"),
  chop: require("./chop.js"),
  clamp: require("./clamp.js"),
  cohensd: require("./cohens-d.js"),
  correl: require("./correl.js"),
  cos: require("./cos.js"),
  count: require("./count.js"),
  covariance: require("./covariance.js"),
  flatten: require("./flatten.js"),
  floor: require("./floor.js"),
  isArray: require("./is-array.js"),
  isBoolean: require("./is-boolean.js"),
  isNumber: require("./is-number.js"),
  isString: require("./is-string.js"),
  isUndefined: require("./is-undefined.js"),
  lerp: require("./lerp.js"),
  log: require("./log.js"),
  map: require("./map.js"),
  max: require("./max.js"),
  mean: require("./mean.js"),
  median: require("./median.js"),
  min: require("./min.js"),
  mode: require("./mode.js"),
  ndarray: require("./ndarray.js"),
  normal: require("./normal.js"),
  normalize: require("./normalize.js"),
  ones: require("./ones.js"),
  pow: require("./pow.js"),
  random: require("./random.js"),
  range: require("./range.js"),
  round: require("./round.js"),
  scale: require("./scale.js"),
  set: require("./set.js"),
  shape: require("./shape.js"),
  shuffle: require("./shuffle.js"),
  sign: require("./sign.js"),
  sin: require("./sin.js"),
  sort: require("./sort.js"),
  sqrt: require("./sqrt.js"),
  std: require("./std.js"),
  sum: require("./sum.js"),
  tan: require("./tan.js"),
  variance: require("./variance.js"),
  vectorize: require("./vectorize.js"),
  zeros: require("./zeros.js"),
}

},{"./abs.js":6,"./add.js":7,"./ceil.js":8,"./chop.js":9,"./clamp.js":10,"./cohens-d.js":11,"./correl.js":12,"./cos.js":13,"./count.js":14,"./covariance.js":15,"./flatten.js":16,"./floor.js":17,"./is-array.js":18,"./is-boolean.js":19,"./is-number.js":20,"./is-string.js":21,"./is-undefined.js":22,"./lerp.js":23,"./log.js":24,"./map.js":25,"./max.js":26,"./mean.js":27,"./median.js":28,"./min.js":29,"./mode.js":30,"./ndarray.js":31,"./normal.js":32,"./normalize.js":33,"./ones.js":34,"./pow.js":35,"./random.js":36,"./range.js":37,"./round.js":38,"./scale.js":39,"./set.js":40,"./shape.js":41,"./shuffle.js":42,"./sign.js":43,"./sin.js":44,"./sort.js":45,"./sqrt.js":46,"./std.js":47,"./sum.js":48,"./tan.js":49,"./variance.js":50,"./vectorize.js":51,"./zeros.js":52}],6:[function(require,module,exports){
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

  let hasFailed

  try {
    hasFailed = false
    abs("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs("foo") should have failed!`)

  try {
    hasFailed = false
    abs(["foo", "bar", "baz"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(["foo", "bar", "baz"]) should have failed!`)

  try {
    hasFailed = false
    abs({x: 5})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs({x: 5}) should have failed!`)

  try {
    hasFailed = false
    abs(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(true) should have failed!`)

  let foo

  try {
    hasFailed = false
    abs(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `abs(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./is-array.js":18,"./is-number.js":20,"./is-undefined.js":22,"./vectorize.js":51}],7:[function(require,module,exports){
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

  argValues.forEach(value => assert(!isUndefined(value), "You must pass numbers or equally-sized arrays of numbers into the `add` function!"))

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
  let hasFailed

  try {
    hasFailed = false
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

  try {
    hasFailed = false
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

  let foo

  try {
    hasFailed = false
    add(3, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `add(3, foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./is-number.js":20,"./is-string.js":21,"./is-undefined.js":22,"./vectorize.js":51}],8:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let ceil = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `ceil` function!")
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

  let hasFailed
  x = "foo"

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  x = [true, 2, 3]

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  x = {x: 5}

  try {
    hasFailed = false
    ceil(x)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(${x}) should have failed!`)

  let foo

  try {
    hasFailed = false
    ceil(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ceil(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./is-number.js":20,"./is-undefined.js":22,"./vectorize.js":51}],9:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let abs = require("./abs.js")
let vectorize = require("./vectorize.js")

let chop = vectorize(function(x, threshold){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `chop` function!")
  assert(isNumber(x), "The `chop` function only works on numbers!")

  threshold = isUndefined(threshold) ? 1e-10 : threshold
  assert(isNumber(threshold), "The `chop` function only works on numbers!")

  return abs(x) < threshold ? 0 : x
})

module.exports = chop

// tests
if (!module.parent){
  let x = 1
  let y = chop(x)
  assert(y === 1, `chop(1) should be 1, but instead is ${y}!`)

  x = 0
  y = chop(x)
  assert(y === 0, `chop(0) should be 0, but instead is ${y}!`)

  x = 1e-15
  y = chop(x)
  assert(y === 0, `chop(1e-15) should be 0, but instead is ${y}!`)

  x = 100
  y = chop(x)
  assert(y === 100, `chop(100) should be 100, but instead is ${y}!`)

  x = -100
  y = chop(x)
  assert(y === -100, `chop(-100) should be -100, but instead is ${y}!`)

  x = [1e-20, 1e-15, 1e-5]
  let yTrue = [0, 0, 1e-5]
  yPred = chop(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `chop(x[i]) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)

  x = [1, 1, 1]
  thresholds = [1e-1, 1e0, 1e1]
  yTrue = [1, 1, 0]
  yPred = chop(x, thresholds)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `chop(x[i]) should be ${yTrue[i]}, but instead is ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    chop(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(true) should have failed!`)

  try {
    hasFailed = false
    chop({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop({}) should have failed!`)

  try {
    hasFailed = false
    chop("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop("foo") should have failed!`)

  try {
    hasFailed = false
    chop(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(() => {})) should have failed!`)

  try {
    hasFailed = false
    chop([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop([1, 2, "three"]) should have failed!`)

  try {
    let foo
    hasFailed = false
    chop(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop(foo) should have failed!`)

  try {
    hasFailed = false
    chop([2, 3, 4], [5, 6, "seven"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `chop([2, 3, 4], [5, 6, "seven"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./abs.js":6,"./is-number.js":20,"./is-undefined.js":22,"./vectorize.js":51}],10:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let clamp = vectorize(function(x, a, b){
  assert(!isUndefined(x) && !isUndefined(a) && !isUndefined(b), "You must pass exactly three numbers (or three equally-sized arrays of numbers) into the `clamp` function!")

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

},{"../misc/assert.js":56,"./is-number.js":20,"./is-undefined.js":22,"./vectorize.js":51}],11:[function(require,module,exports){
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

},{"./mean.js":27,"./sqrt.js":46,"./variance.js":50}],12:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let covariance = require("./covariance.js")
let std = require("./std.js")

function correl(x, y){
  assert(!isUndefined(x) && !isUndefined(y), "You must pass two equally-sized one-dimensional arrays into the `correl` function!")
  assert(isArray(x) && isArray(y), "The `correl` function works on exactly two one-dimensional arrays!")
  assert(x.length === y.length, "The two one-dimensional arrays passed into the `correl` function must have the same length!")

  x.concat(y).forEach(function(value){
    assert(isNumber(value), "The two one-dimensional arrays passed into the `correl` function must contain only numbers!")
  })

  return covariance(x, y) / (std(x) * std(y))
}

module.exports = correl

// tests
if (!module.parent){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let add = require("./add.js")
  let scale = require("./scale.js")

  let x = normal([10000])
  let y = normal([10000])
  let r = correl(x, y)

  assert(abs(r) < 0.05, `correl(normal([10000]), normal([10000])) should be approximately 0, but instead was ${r}!`)

  y = add(x, scale(0.01, normal([10000])))
  r = correl(x, y)
  assert(r > 0.95, `correl(x, x + 0.01 * normal([10000])) should be approximately 1, but instead was ${r}!`)

  y = add(scale(-1, x), scale(0.01, normal([10000])))
  r = correl(x, y)
  assert(r < -0.95, `correl(x, -x + 0.01 * normal([10000])) should be approximately -1, but instead was ${r}!`)

  let hasFailed

  try {
    hasFailed = false
    correl(1, 2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(1, 2) should have failed!`)

  try {
    hasFailed = false
    correl(true, false)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(true, false) should have failed!`)

  try {
    hasFailed = false
    correl([], {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([], {}) should have failed!`)

  try {
    hasFailed = false
    correl("foo", "bar")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl("foo", "bar") should have failed!`)

  try {
    hasFailed = false
    correl([2, 3, 4], ["a", "b", "c"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([2, 3, 4], ["a", "b", "c"]) should have failed!`)

  try {
    hasFailed = false
    correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl([[2, 3, 4], [5, 6, 7]], [[8, 9, 10], [11, 12, 13]]) should have failed!`)

  let fn = () => {}

  try {
    hasFailed = false
    correl(fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(fn, fn) should have failed!`)

  try {
    let foo
    hasFailed = false
    correl(foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `correl(foo, foo) should have failed!`)

  assert(isNaN(correl([2, 3, 4], [1, 1, 1])), `correl([2, 3, 4], [1, 1, 1]) should be NaN!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./abs.js":6,"./add.js":7,"./covariance.js":15,"./is-array.js":18,"./is-number.js":20,"./is-undefined.js":22,"./normal.js":32,"./scale.js":39,"./std.js":47}],13:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let cos = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a single number or single array of numbers into the `cos` function!")
  assert(isNumber(x), "The `cos` function only works on numbers!")
  return Math.cos(x)
})

module.exports = cos

// tests
if (!module.parent){
  let min = require("./min.js")
  let max = require("./max.js")
  let normal = require("./normal.js")
  let chop = require("./chop.js")

  let x = normal([10000]).map(v => v * 100)
  let y = cos(x)

  assert(min(y) >= -1, "Values produced by the `cos` function should never be below -1!")
  assert(max(y) <= 1, "Values produced by the `cos` function should never be above 1!")

  x = 0
  y = cos(x)
  assert(y === 1, `cos(0) should be 1, but instead is ${y}!`)

  x = Math.PI / 2
  y = cos(x)
  assert(chop(y) === 0, `cos(Math.PI / 2) should be 0, but instead is ${y}!`)

  x = Math.PI
  y = cos(x)
  assert(y === -1, `cos(Math.PI) should be -1, but instead is ${y}!`)

  x = 3 * Math.PI / 2
  y = cos(x)
  assert(chop(y) === 0, `cos(3 * Math.PI / 2) should be 0, but instead is ${y}!`)

  let hasFailed

  try {
    hasFailed = false
    cos("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos("foo") should have failed!`)

  try {
    hasFailed = false
    cos(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(true) should have failed!`)

  try {
    hasFailed = false
    cos({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos({}) should have failed!`)

  try {
    hasFailed = false
    cos([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    cos(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    cos(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `cos(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./chop.js":9,"./is-number.js":20,"./is-undefined.js":22,"./max.js":26,"./min.js":29,"./normal.js":32,"./vectorize.js":51}],14:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let flatten = require("./flatten.js")

function count(arr, items){
  assert(!isUndefined(arr), "You must an array and an item to count to the `count` function!")
  assert(isArray(arr), "You must an array and an item to count to the `count` function!")

  // NOTE: This currently flattens the array that's passed in, which means that it's not possible to count occurrences of arrays within arrays! I'm not sure whether this is desirable behavior or not, so I'm just making a note of it for now. It's not trivial to count occurrences of identical objects, so maybe this function should refuse to operate on objects!
  let temp = flatten(arr)

  if (isArray(items)){
    return flatten(items).map(function(item1){
      return temp.filter(item2 => item2 === item1).length
    })
  } else {
    return temp.filter(other => other === items).length
  }
}

module.exports = count

// tests
if (!module.parent){
  let random = require("./random.js")
  let round = require("./round.js")
  let abs = require("./abs.js")

  let x = [2, 2, 2, 3, 4, 2, 2]
  let yTrue = 5
  let yPred = count(x, 2)
  assert(yTrue === yPred)

  x = [true, true, false, false, false, "a", "a", "a", "a", "a"]
  yTrue = [2, 3, 5]
  yPred = count(x, [true, false, "a"])
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `count([true, true, false, false, false, "a", "a", "a", "a", "a"], [true, false, "a"]) should be [2, 3, 5]!`)

  x = round(random([10000]))
  let y1 = count(x, 0)
  let y2 = count(x, 1)
  assert(abs(y1 - 5000) < 0.05 * 5000, `count(round(random([10000])), 0) should be approximately 5000!`)
  assert(abs(y2 - 5000) < 0.05 * 5000, `count(round(random([10000])), 1) should be approximately 5000!`)

  assert(count([2, 3, 4]) === 0, `count([2, 3, 4]) should be 0!`)

  let hasFailed

  try {
    hasFailed = false
    count()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count() should have failed!`)

  try {
    hasFailed = false
    count(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(234) should have failed!`)

  try {
    hasFailed = false
    count(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(true) should have failed!`)

  try {
    hasFailed = false
    count("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count("foo") should have failed!`)

  try {
    hasFailed = false
    count({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count({}) should have failed!`)

  try {
    hasFailed = false
    count(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `count(() => {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./abs.js":6,"./flatten.js":16,"./is-array.js":18,"./is-undefined.js":22,"./random.js":36,"./round.js":38}],15:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let mean = require("./mean.js")

function covariance(x, y){
  assert(!isUndefined(x) && !isUndefined(y), "You must pass two equally-sized one-dimensional arrays into the `covariance` function!")

  assert(isArray(x) && isArray(y), "The `covariance` function only works on two equally-sized one-dimensional arrays of numbers!")

  x.concat(y).forEach(function(v){
    assert(isNumber(v), "The `covariance` function only works on two equally-sized one-dimensional arrays of numbers!")
  })

  assert(x.length === y.length, "The two one-dimensional arrays passed into the `covariance` function must be of equal length!")

  let mx = mean(x)
  let my = mean(y)
  let out = 0
  for (let i=0; i<x.length; i++) out += (x[i] - mx) * (y[i] - my)
  return out / x.length
}

module.exports = covariance

// tests
if (!module.parent){
  let normal = require("./normal.js")
  let abs = require("./abs.js")
  let chop = require("./chop.js")

  let x = [2, 3, 4]
  let y = [1, 1, 1]
  let cv = covariance(x, y)
  assert(cv === 0, `covariance([2, 3, 4], [1, 1, 1]) should be 0, but instead was ${cv}!`)

  x = normal([10000])
  y = normal([10000])
  cv = covariance(x, y)
  assert(abs(cv) < 0.05, `covariance(normal([10000]), normal(10000)) should be approximately 0, but instead is ${cv}!`)

  y = covariance(x, x)
  assert(y > 0.95, `covariance(x, x) should be approximately 1, but instead is ${y}!`)

  assert(isNaN(covariance([], [])), `covariance([], []) should be NaN!`)

  let hasFailed

  try {
    hasFailed = false
    covariance([1, 2, 3], [1, 2, 3, 4])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([1, 2, 3], [1, 2, 3, 4]) should have failed!`)

  try {
    hasFailed = false
    covariance(["foo", "bar", "baz"], ["a", "b", "c"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance(["foo", "bar", "baz"], ["a", "b", "c"]) should have failed!`)

  try {
    let foo
    hasFailed = false
    covariance([foo], [foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([foo], [foo]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    covariance([fn], [fn])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance([fn], [fn]) should have failed!`)

  try {
    hasFailed = false
    covariance({}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `covariance({}, {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./abs.js":6,"./chop.js":9,"./is-array.js":18,"./is-number.js":20,"./is-undefined.js":22,"./mean.js":27,"./normal.js":32}],16:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")

function flatten(arr){
  assert(!isUndefined(arr), "You must pass one array into the `flatten` function!")
  assert(isArray(arr), "The `flatten` function only works on arrays!")

  let out = []

  arr.forEach(function(value){
    if (isArray(value)){
      out = out.concat(flatten(value))
    } else {
      out.push(value)
    }
  })

  return out
}

module.exports = flatten

// tests
if (!module.parent){
  let normal = require("./normal.js")

  let x = [2, 3, 4]
  let yTrue = [2, 3, 4]
  let yPred = flatten(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `flatten([2, 3, 4]) should be [2, 3, 4]!`)

  x = [[2, 3, 4], [5, 6, 7]]
  yTrue = [2, 3, 4, 5, 6, 7]
  yPred = flatten(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `flatten([[2, 3, 4], [5, 6, 7]]) should be [2, 3, 4, 5, 6, 7]!`)

  x = normal([2, 3, 4, 5])
  yPred = flatten(x)
  assert(yPred.length === 120, `flatten(normal([2, 3, 4, 5])) should have 120 values!`)

  let hasFailed

  try {
    hasFailed = false
    flatten()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten() should have failed!`)

  try {
    hasFailed = false
    flatten({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten({}) should have failed!`)

  try {
    hasFailed = false
    flatten(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten(true) should have failed!`)

  try {
    hasFailed = false
    flatten("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten("foo") should have failed!`)

  try {
    hasFailed = false
    flatten(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `flatten(() => {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./is-array.js":18,"./is-undefined.js":22,"./normal.js":32}],17:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let floor = vectorize(function(x){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `floor` function!")

  assert(isNumber(x), "The `floor` function only works on numbers!")

  return Math.floor(x)
})

module.exports = floor

// tests
if (!module.parent){
  let random = require("./random.js")
  let zeros = require("./zeros.js")

  let x = 5.95
  let yTrue = 5
  let yPred = floor(x)
  assert(yTrue === yPred, `floor(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = -3.25
  yTrue = -4
  yPred = floor(x)
  assert(yTrue === yPred, `floor(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [1.25, 2.5, 3.75]
  yTrue = [1, 2, 3]
  yPred = floor(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `floor(${x[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = random([500])
  yTrue = zeros([500])
  yPred = floor(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `floor(${x[i]}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    floor("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor("foo") should have failed!`)

  try {
    hasFailed = false
    floor({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor({}) should have failed!`)

  try {
    hasFailed = false
    floor([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor([1, 2, "three"]) should have failed!`)

  try {
    let foo
    hasFailed = false
    floor(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor(foo) should have failed!`)

  try {
    hasFailed = false
    floor(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `floor(() => {}) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./is-number.js":20,"./is-undefined.js":22,"./random.js":36,"./vectorize.js":51,"./zeros.js":52}],18:[function(require,module,exports){
function isArray(obj){
  return obj instanceof Array
}

module.exports = isArray

// tests
if (!module.parent){
  let assert = require("../misc/assert.js")

  assert(isArray([]), `isArray([]) should return true!`)
  assert(isArray([2, 3, 4]), `isArray([2, 3, 4]) should return true!`)
  assert(isArray(new Array()), `isArray(new Array()) should return true!`)
  assert(!isArray({}), `isArray({}) should return false!`)
  assert(!isArray({push: () => {}}), `isArray({push: () => {}}) should return false!`)
  assert(!isArray("foo"), `isArray("foo") should return false!`)
  assert(!isArray(true), `isArray(true) should return false!`)
  assert(!isArray(false), `isArray(false) should return false!`)
  assert(!isArray(() => {}), `isArray(() => {}) should return false!`)
  assert(!isArray(3), `isArray(3) should return false!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56}],19:[function(require,module,exports){
function isBoolean(x){
  return typeof(x) === "boolean"
}

module.exports = isBoolean

},{}],20:[function(require,module,exports){
function isNumber(x){
  return typeof(x) === "number"
}

module.exports = isNumber

// tests
if (!module.parent){
  let assert = require("../misc/assert.js")

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

},{"../misc/assert.js":56}],21:[function(require,module,exports){
function isString(s){
  return typeof(s) === "string"
}

module.exports = isString

// tests
if (!module.parent){
  let assert = require("../misc/assert.js")

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

},{"../misc/assert.js":56}],22:[function(require,module,exports){
function isUndefined(x){
  return x === null || typeof(x) === "undefined"
}

module.exports = isUndefined

// tests
if (!module.parent){
  let assert = require("../misc/assert.js")

  assert(!isUndefined("foo"), `isUndefined("foo") should be false, but instead was true!`)
  assert(!isUndefined({}), `isUndefined({}) should be false, but instead was true!`)
  assert(!isUndefined(3), `isUndefined(3) should be false, but instead was true!`)
  assert(!isUndefined([]), `isUndefined([]) should be false, but instead was true!`)
  assert(!isUndefined(true), `isUndefined(true) should be false, but instead was true!`)
  assert(!isUndefined(false), `isUndefined(false) should be false, but instead was true!`)
  assert(!isUndefined(() => {}), `isUndefined(() => {}) should be false, but instead was true!`)

  let x
  assert(isUndefined(x), `isUndefined(x) should be true, but instead was false!`)

  let hasFailed

  try {
    hasFailed = false
    isUndefined(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `isUndefined(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56}],23:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let lerp = vectorize(function(a, b, f){
  assert(!isUndefined(a) && !isUndefined(b) && !isUndefined(f), "You must pass exactly three numbers (or three equally-sized arrays of numbers) into the `lerp` function!")

  assert(isNumber(a) && isNumber(b) && isNumber(f), "The `lerp` function only works on numbers!")

  return f * (b - a) + a
})

module.exports = lerp

// tests
if (!module.parent){
  let a = 0
  let b = 1
  let f = 1
  let c = lerp(a, b, f)
  assert(c === 1, `lerp(0, 1, 1) should be 1, but instead was ${c}!`)

  a = -1
  b = 1
  f = 0.5
  c = lerp(a, b, f)
  assert(c === 0, `lerp(-1, 1, 0.5) should be 0, but instead was ${c}!`)

  a = -100
  b = 100
  f = 0.75
  c = lerp(a, b, f)
  assert(c === 50, `lerp(-100, 100, 0.75) should be 50, but instead was ${c}!`)

  a = [1, 2, 3]
  b = [2, 3, 4]
  f = [0.5, 0.75, 0.9]
  let cTrue = [1.5, 2.75, 3.9]
  let cPred = lerp(a, b, f)
  for (let i=0; i<cTrue.length; i++) assert(cTrue[i] === cPred[i], `lerp(${a[i]}, ${b[i]}, ${f[i]}) should be ${cTrue[i]}, but instead was ${cPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    lerp(3, 4, "foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(3, 4, "foo") should have failed!`)

  try {
    hasFailed = false
    lerp([1], [2, 3], 0.75)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp([1], [2, 3], 0.75) should have failed!`)

  try {
    hasFailed = false
    lerp({}, {}, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp({}, {}, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    lerp(foo, foo, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(foo, foo, foo) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    lerp(fn, fn, fn)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(fn, fn, fn) should have failed!`)

  try {
    hasFailed = false
    lerp(1, 2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `lerp(1, 2) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./is-number.js":20,"./is-undefined.js":22,"./vectorize.js":51}],24:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let vectorize = require("./vectorize.js")

let log = vectorize(function(x, base){
  assert(!isUndefined(x), "You must pass a single number or a single array of numbers into the `log` function!")
  assert(isNumber(x), "You must pass a single number or a single array of numbers into the `log` function!")

  base = isUndefined(base) ? Math.E : base
  assert(isNumber(base), "The base parameter of the `log` function must be a number or an array of numbers!")

  return Math.log(x) / Math.log(base)
})

module.exports = log

// tests
if (!module.parent){
  let abs = require("./abs.js")
  let chop = require("./chop.js")

  let x = Math.E
  let base = Math.E
  let yTrue = 1
  let yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 10
  base = 10
  yTrue = 1
  yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = 100
  base = 10
  yTrue = 2
  yPred = log(x, base)
  assert(yTrue === yPred, `log(${x}) should be ${yTrue}, but instead was ${yPred}!`)

  x = [100, 1000, 10000]
  base = 10
  yTrue = [2, 3, 4]
  yPred = log(x, base)
  for (let i=0; i<yTrue.length; i++) assert(chop(abs(yTrue[i] - yPred[i])) === 0, `log(${x[i]}, ${base}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  x = 64
  base = [2, 4, 8]
  yTrue = [6, 3, 2]
  yPred = log(x, base)
  for (let i=0; i<yTrue.length; i++) assert(chop(abs(yTrue[i] - yPred[i])) === 0, `log(${x[i]}, ${base}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  assert(log([]).length === 0, `log([]) should have produced an empty array!`)

  let hasFailed

  try {
    hasFailed = false
    log()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log() should have failed!`)

  try {
    hasFailed = false
    log("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log("foo") should have failed!`)

  try {
    hasFailed = false
    log({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log({}) should have failed!`)

  try {
    hasFailed = false
    log(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(true) should have failed!`)

  try {
    hasFailed = false
    log(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    log(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `log(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./abs.js":6,"./chop.js":9,"./is-number.js":20,"./is-undefined.js":22,"./vectorize.js":51}],25:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isNumber = require("./is-number.js")
let vectorize = require("./vectorize.js")

let map = vectorize(function(x, a, b, c, d){
  assert(!isUndefined(x) && !isUndefined(a) && !isUndefined(b) && !isUndefined(c) && !isUndefined(d), "You should pass five numbers (or five equally-sized arrays of numbers) into the `map` function!")

  assert(isNumber(x) && isNumber(a) && isNumber(b) && isNumber(c) && isNumber(d), "The `map` function only works on numbers!")

  return (d - c) * (x - a) / (b - a) + c
})

module.exports = map

// tests
if (!module.parent){
  let x = 1
  let a = 0
  let b = 2
  let c = 0
  let d = 10
  let yTrue = 5
  let yPred = map(x, a, b, c, d)
  assert(yTrue === yPred, `map(${x}, ${a}, ${b}, ${c}, ${c}) should be ${yTrue}, but instead is ${yPred}!`)

  x = 2
  a = 1
  b = 3
  c = 100
  d = 500
  yTrue = 300
  yPred = map(x, a, b, c, d)
  assert(yTrue === yPred, `map(${x}, ${a}, ${b}, ${c}, ${c}) should be ${yTrue}, but instead is ${yPred}!`)

  x = [1, 2, 3]
  a = 0
  b = 4
  c = 100
  d = 500
  yTrue = [200, 300, 400]
  yPred = map(x, a, b, c, d)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `map(${x[i]}, ${a}, ${b}, ${c}, ${d}) should be ${yTrue[i]}, but instead was ${yPred[i]}!`)

  let hasFailed

  try {
    hasFailed = false
    map(1, 2, 3, 4, "five")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, "five") should have failed!`)

  try {
    hasFailed = false
    map()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map() should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    map(1, 2, 3, 4, foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, foo) should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, () => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, () => {}) should have failed!`)

  try {
    hasFailed = false
    map(1, 2, 3, 4, true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `map(1, 2, 3, 4, true) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./is-number.js":20,"./is-undefined.js":22,"./vectorize.js":51}],26:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let isUndefined = require("./is-undefined.js")
let flatten = require("./flatten.js")

function max(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `max` function!")

  assert(isArray(arr), "You must pass one array of numbers into the `max` function!")

  let temp = flatten(arr)

  temp.forEach(function(value){
    assert(isNumber(value), "The `max` function only works on numbers or arrays of numbers!")
  })

  let out = -Infinity

  temp.forEach(function(x){
    if (x > out){
      out = x
    }
  })

  return out === -Infinity ? undefined : out
}

module.exports = max

// tests
if (!module.parent){
  let normal = require("./normal.js")
  let random = require("./random.js")
  let min = require("./min.js")

  let x = [2, 3, 4]
  let y = max(x)
  assert(y === 4, `max([2, 3, 4]) should be 4, but instead was ${y}!`)

  x = [-10, -5, -20]
  y = max(x)
  assert(y === -5, `max([-10, -5, -20]) should be -5, but instead was ${y}!`)

  x = random([10000])
  y = max(x)
  assert(y <= 1 && y >= 0, `max(random([10000])) should be >= 0 and <= 1!`)

  x = normal([10000])
  xMin = min(x)
  xMax = max(x)
  xRange = xMax - xMin
  x = x.map(v => (v - xMin) / xRange)
  assert(max(x) === 1, `max(normalizedData) should be 1!`)

  let hasFailed

  try {
    hasFailed = false
    max()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max() should have failed!`)

  try {
    hasFailed = false
    max(2)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(2) should have failed!`)

  try {
    hasFailed = false
    max(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(true) should have failed!`)

  try {
    hasFailed = false
    max({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max({}) should have failed!`)

  try {
    hasFailed = false
    max(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(() => {}) should have failed!`)

  try {
    hasFailed = false
    max([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    max("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max("foo") should have failed!`)

  try {
    let foo
    hasFailed = false
    max(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `max(foo) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./flatten.js":16,"./is-array.js":18,"./is-number.js":20,"./is-undefined.js":22,"./min.js":29,"./normal.js":32,"./random.js":36}],27:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let sum = require("./sum.js")

function mean(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `mean` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `mean` function!")

  let temp = flatten(arr)

  temp.forEach(function(value){
    assert(isNumber(value), "The `mean` function only works on arrays of numbers!")
  })

  return sum(temp) / temp.length
}

module.exports = mean

// tests
if (!module.parent){
  let normal = require("./normal.js")
  let random = require("./random.js")
  let abs = require("./abs.js")

  let x = [2, 3, 4]
  let yTrue = 3
  let yPred = mean(x)
  assert(yTrue === yPred, `mean(2, 3, 4) should be 3, but instead is ${yPred}!`)

  x = normal([10000])
  yPred = mean(x)
  assert(abs(yPred) < 0.05, `mean(normal([10000])) should be approximately 0, but instead was ${yPred}!`)

  x = random([10000])
  yPred = mean(x)
  assert(yPred - 0.5 < 0.05, `mean(random([10000])) should be approximately 0.5, but instead was ${yPred}!`)

  x = normal([10, 10, 10, 10])
  yPred = mean(x)
  assert(abs(yPred) < 0.05, `mean(normal([10, 10, 10, 10])) should be approximately 0, but instead was ${yPred}!`)

  let hasFailed

  try {
    hasFailed = false
    mean()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean() should have failed!`)

  try {
    hasFailed = false
    mean("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean("foo") should have failed!`)

  try {
    hasFailed = false
    mean({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean({}) should have failed!`)

  try {
    hasFailed = false
    mean(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(true) should have failed!`)

  try {
    let foo
    hasFailed = false
    mean(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(foo) should have failed!`)

  try {
    hasFailed = false
    mean(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean(() => {}) should have failed!`)

  try {
    hasFailed = false
    mean([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mean([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./abs.js":6,"./flatten.js":16,"./is-array.js":18,"./is-number.js":20,"./is-undefined.js":22,"./normal.js":32,"./random.js":36,"./sum.js":48}],28:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")
let sort = require("./sort.js")

function median(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `median` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `median` function!")

  let temp = flatten(arr)

  temp.forEach(function(item){
    assert(isNumber(item), "The `median` function only works on numbers!")
  })

  temp = sort(temp, function(a, b){
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })

  let out

  if (temp.length % 2 === 0){
    out = (temp[temp.length / 2 - 1] + temp[temp.length / 2]) / 2
  } else {
    out = temp[Math.floor(temp.length / 2)]
  }

  return out
}

module.exports = median

// tests
if (!module.parent){
  let shuffle = require("./shuffle.js")
  let normal = require("./normal.js")
  let random = require("./random.js")
  let round = require("./round.js")
  let scale = require("./scale.js")

  let x = [2, 4, 3]
  let yTrue = 3
  let yPred = median(x)
  assert(yTrue === yPred, `median([2, 4, 3]) should be 3, but instead was ${yPred}!`)

  let x1 = round(scale(random([5, 5, 5, 5]), 100))
  let x2 = shuffle(x1)
  let x3 = shuffle(x1)
  let x4 = shuffle(x1)
  let y1 = median(x1)
  let y2 = median(x2)
  let y3 = median(x3)
  let y4 = median(x4)
  assert(y1 === y2 && y2 === y3 && y3 === y4, "The `median` function should return the same median for shuffled versions of the same array!")

  assert(isNaN(median([])), `median([]) should be NaN!`)

  let hasFailed

  try {
    hasFailed = false
    median()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median() should have failed!`)

  try {
    hasFailed = false
    median("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median("foo") should have failed!`)

  try {
    hasFailed = false
    median([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    median([true])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([true]) should have failed!`)

  try {
    hasFailed = false
    median([{}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([{}]) should have failed!`)

  try {
    let foo
    hasFailed = false
    median([foo, foo, foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([foo, foo, foo]) should have failed!`)

  try {
    let fn = () => {}
    hasFailed = false
    median([fn, fn, fn,])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `median([fn, fn, fn]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./flatten.js":16,"./is-array.js":18,"./is-number.js":20,"./is-undefined.js":22,"./normal.js":32,"./random.js":36,"./round.js":38,"./scale.js":39,"./shuffle.js":42,"./sort.js":45}],29:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let flatten = require("./flatten.js")

function min(arr){
  assert(!isUndefined(arr), "You must pass one array of numbers into the `min` function!")
  assert(isArray(arr), "You must pass one array of numbers into the `min` function!")

  let temp = flatten(arr)

  temp.forEach(function(item){
    assert(isNumber(item), "The `min` function only works on arrays of numbers!")
  })

  let out = Infinity

  temp.forEach(function(x){
    if (x < out){
      out = x
    }
  })

  return out === Infinity ? undefined : out
}

module.exports = min

// tests
if (!module.parent){
  let random = require("./random.js")

  let x = [4, 2, 3]
  let yTrue = 2
  let yPred = min(x)
  assert(yTrue === yPred, `min([4, 2, 3]) should be 2, but instead was ${yPred}!`)

  x = [[-50, 50, 234], [100, -100, 0]]
  yTrue = -100
  yPred = min(x)
  assert(yTrue === yPred, `min([[-50, 50, 234], [100, -100, 0]]) should be -100, but instead was ${yPred}!`)

  x = random([2, 3, 4, 5])
  yPred = min(x)
  assert(yPred <= 1 && yPred >= 0, `min(random([2, 3, 4, 5])) should be >= 0 and <= 1!`)

  let hasFailed

  try {
    hasFailed = false
    min()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min() should have failed!`)

  try {
    hasFailed = false
    min(234)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min(234) should have failed!`)

  try {
    hasFailed = false
    min({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min({}) should have failed!`)

  try {
    hasFailed = false
    min("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min("foo") should have failed!`)

  try {
    hasFailed = false
    min(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min(true) should have failed!`)

  try {
    hasFailed = false
    min([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([1, 2, "three"]) should have failed!`)

  try {
    hasFailed = false
    min([() => {}])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([() => {}]) should have failed!`)

  try {
    let foo
    hasFailed = false
    min([foo, foo, foo])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `min([foo, foo, foo]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./flatten.js":16,"./is-array.js":18,"./is-number.js":20,"./is-undefined.js":22,"./random.js":36}],30:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let flatten = require("./flatten.js")
let count = require("./count.js")
let set = require("./set.js")
let sort = require("./sort.js")

function mode(arr){
  assert(!isUndefined(arr), "You must pass one array into the `mode` function!")
  assert(isArray(arr), "You  must pass one array into the `mode` function!")

  let temp = flatten(arr)
  let counts = {}
  let refs = {}
  let tempSet = set(temp)

  tempSet.forEach(function(item){
    counts[item] = count(temp, item)
    refs[item] = item
  })

  let sortedTempSet = sort(tempSet, function(a, b){
    let count1 = counts[a]
    let count2 = counts[b]

    if (count1 > count2) return -1
    if (count1 < count2) return 1
    return 0
  })

  let mostCountedItem = sortedTempSet[0]
  let out = sortedTempSet.filter(item => counts[item] === counts[mostCountedItem])
  return out
}

module.exports = mode

// tests
if (!module.parent){
  let random = require("./random.js")
  let round = require("./round.js")
  let shuffle = require("./shuffle.js")
  let scale = require("./scale.js")

  let x = [2, 3, 3, 3, 2, 4]
  let yTrue = [3]
  let yPred = mode(x)
  for (let i=0; i<yTrue.length; i++) assert(yTrue[i] === yPred[i], `mode([2, 3, 3, 3, 2, 4]) should be 3, but instead was ${yPred}!`)

  let x1 = round(scale(random([5, 5, 5, 5]), 100))
  let x2 = shuffle(x1)
  let x3 = shuffle(x1)
  let x4 = shuffle(x1)
  let y1 = mode(x1)
  let y2 = mode(x2)
  let y3 = mode(x3)
  let y4 = mode(x4)
  for (let i=0; i<y1.length; i++) assert(y1[i] === y2[i], "The `mode` function should return the same mode for shuffled versions of the same array!")
  for (let i=0; i<y1.length; i++) assert(y2[i] === y3[i], "The `mode` function should return the same mode for shuffled versions of the same array!")
  for (let i=0; i<y1.length; i++) assert(y3[i] === y4[i], "The `mode` function should return the same mode for shuffled versions of the same array!")

  let hasFailed

  try {
    hasFailed = false
    mode()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode() should have failed!`)

  try {
    hasFailed = false
    mode("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode("foo") should have failed!`)

  try {
    hasFailed = false
    mode({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode({}) should have failed!`)

  try {
    hasFailed = false
    mode(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode(() => {}) should have failed!`)

  try {
    hasFailed = false
    mode(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode(true) should have failed!`)

  try {
    hasFailed = false
    mode()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `mode() should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./count.js":14,"./flatten.js":16,"./is-array.js":18,"./is-undefined.js":22,"./random.js":36,"./round.js":38,"./scale.js":39,"./set.js":40,"./shuffle.js":42,"./sort.js":45}],31:[function(require,module,exports){
let assert = require("../misc/assert.js")
let isUndefined = require("./is-undefined.js")
let isArray = require("./is-array.js")
let isNumber = require("./is-number.js")
let floor = require("./floor.js")
let range = require("./range.js")

let error = "You must pass an integer or a one-dimensional array of integers into the `ndarray` function!"

function ndarray(shape){
  assert(!isUndefined(shape), error)

  if (!isArray(shape)) shape = [shape]

  assert(shape.length > 0, error)

  shape.forEach(function(x){
    assert(isNumber(x), error)
    assert(floor(x) === x, error)
    assert(x >= 0, error)
  })

  if (shape.length === 1){
    return range(0, shape[0]).map(v => 0)
  } else {
    let out = []
    for (let i=0; i<shape[0]; i++) out.push(ndarray(shape.slice(1, shape.length)))
    return out
  }
}

module.exports = ndarray

// tests
if (!module.parent){
  let flatten = require("./flatten.js")

  assert(ndarray(3).length === 3, `ndarray(3) should have a length of 3!`)
  assert(ndarray([3]).length === 3, `ndarray([3]) should have a length of 3!`)
  assert(ndarray([3, 2]).length === 3, `ndarray([3, 2]) should have a length of 3!`)
  assert(flatten(ndarray([2, 3, 4])).length === 24, `flatten(ndarray([2, 3, 4])) should have a length of 24!`)

  let hasFailed

  try {
    hasFailed = false
    ndarray()
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray() should have failed!`)

  try {
    hasFailed = false
    ndarray("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray("foo") should have failed!`)

  try {
    hasFailed = false
    ndarray(3.5)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(3.5) should have failed!`)

  try {
    hasFailed = false
    ndarray(-10)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(-10) should have failed!`)

  try {
    hasFailed = false
    ndarray({})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray({}) should have failed!`)

  try {
    hasFailed = false
    ndarray(true)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(true) should have failed!`)

  try {
    hasFailed = false
    ndarray([])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray([]) should have failed!`)

  try {
    hasFailed = false
    ndarray(() => {})
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(() => {}) should have failed!`)

  try {
    let foo
    hasFailed = false
    ndarray(foo)
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray(foo) should have failed!`)

  try {
    hasFailed = false
    ndarray([1, 2, "three"])
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `ndarray([1, 2, "three"]) should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/assert.js":56,"./flatten.js":16,"./floor.js":17,"./is-array.js":18,"./is-number.js":20,"./is-undefined.js":22,"./range.js":37}],32:[function(require,module,exports){
let isUndefined = require("./is-undefined.js")
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function normal(shape){
  function n(){
    let u1 = Math.random()
    let u2 = Math.random()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  if (isUndefined(shape)) return n()
  return apply(ndarray(shape), n)
}

module.exports = normal

// tests
if (!module.parent){
  let assert = require("../misc/assert.js")
  let std = require("./std.js")
  let mean = require("./mean.js")
  let abs = require("./abs.js")

  let x = normal([10000])
  let m = mean(x)
  let s = std(x)

  assert(abs(m) < 0.05, `normal([10000]) should have a mean of approximately 0!`)
  assert(abs(s - 1) < 0.05, `normal([10000]) should have a standard deviation of approximately 1!`)

  x = normal([10, 10, 10, 10])
  m = mean(x)
  s = std(x)

  assert(abs(m) < 0.05, `normal([10, 10, 10, 10]) should have a mean of approximately 0!`)
  assert(abs(s - 1) < 0.05, `normal([10, 10, 10, 10]) should have a standard deviation of approximately 1!`)

  let hasFailed

  try {
    hasFailed = false
    normal("foo")
  } catch(e){
    hasFailed = true
  }

  assert(hasFailed, `normal("foo") should have failed!`)

  console.log("All tests passed!")
}

},{"../misc/apply.js":54,"../misc/assert.js":56,"./abs.js":6,"./is-undefined.js":22,"./mean.js":27,"./ndarray.js":31,"./std.js":47}],33:[function(require,module,exports){
let min = require("./min.js")
let max = require("./max.js")

function normalize(arr){
  let arrMin = min(arr)
  let arrMax = max(arr)
  let arrRange = arrMax - arrMin
  return arr.map(v => (v - arrMin) / arrRange)
}

module.exports = normalize

},{"./max.js":26,"./min.js":29}],34:[function(require,module,exports){
let ndarray = require("./ndarray.js")

function ones(shape){
  return apply(ndarray(shape), v => 1)
}

module.exports = ones

},{"./ndarray.js":31}],35:[function(require,module,exports){
let isArray = require("./is-array.js")

function pow(x, p){
  if (isArray(x)) return x.map(v => pow(v, p))
  return Math.pow(x, p)
}

module.exports = pow

},{"./is-array.js":18}],36:[function(require,module,exports){
let ndarray = require("./ndarray.js")
let apply = require("../misc/apply.js")

function random(shape){
  if (!shape) return Math.random()
  return apply(ndarray(shape), Math.random)
}

module.exports = random

},{"../misc/apply.js":54,"./ndarray.js":31}],37:[function(require,module,exports){
function range(a, b, step=1){
  let out = []
  for (let i=a; i<b; i+=step) out.push(i)
  return out
}

module.exports = range

},{}],38:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let round = vectorize(Math.round)
module.exports = round

},{"./vectorize.js":51}],39:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let scale = vectorize((a, b) => a * b)
module.exports = scale

},{"./vectorize.js":51}],40:[function(require,module,exports){
function set(arr){
  let out = []

  arr.forEach(function(item){
    if (out.indexOf(item) < 0) out.push(item)
  })

  return out
}

module.exports = set

},{}],41:[function(require,module,exports){

},{}],42:[function(require,module,exports){
let floor = require("./floor.js")
let random = require("./random.js")

function shuffle(arr){
  let out = arr.slice()

  for (let i=0; i<arr.length; i++){
    let index1 = floor(random() * arr.length)
    let index2 = floor(random() * arr.length)
    let buffer = out[index1]
    out[index1] = out[index2]
    out[index2] = buffer
  }

  return out
}

module.exports = shuffle

},{"./floor.js":17,"./random.js":36}],43:[function(require,module,exports){
let vectorize = require("./vectorize.js")

let sign = vectorize(function(x){
  if (x < 0) return -1
  if (x > 1) return 1
  return 0
})

module.exports = sign

},{"./vectorize.js":51}],44:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let sin = vectorize(Math.sin)
module.exports = sin

},{"./vectorize.js":51}],45:[function(require,module,exports){
function sort(arr, fn){
  let out = arr.slice()
  out.sort(fn)
  return out
}

module.exports = sort

},{}],46:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let sqrt = vectorize(Math.sqrt)
module.exports = sqrt

},{"./vectorize.js":51}],47:[function(require,module,exports){
let flatten = require("./flatten.js")
let mean = require("./mean.js")
let pow = require("./pow.js")
let sqrt = require("./sqrt.js")

function std(arr){
  let temp = flatten(arr)
  let m = mean(temp)
  let out = 0
  temp.forEach(x => out += pow(x - m, 2))
  return sqrt(out / temp.length)
}

module.exports = std

},{"./flatten.js":16,"./mean.js":27,"./pow.js":35,"./sqrt.js":46}],48:[function(require,module,exports){
function sum(arr){
  let out = 0
  arr.forEach(v => out += v)
  return out
}

module.exports = sum

},{}],49:[function(require,module,exports){
let vectorize = require("./vectorize.js")
let tan = vectorize(Math.tan)
module.exports = tan

},{"./vectorize.js":51}],50:[function(require,module,exports){
let pow = require("./pow.js")
let std = require("./std.js")

function variance(arr){
  return pow(std(arr), 2)
}

module.exports = variance

},{"./pow.js":35,"./std.js":47}],51:[function(require,module,exports){
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

},{"./is-array.js":18}],52:[function(require,module,exports){
let ndarray = require("./ndarray.js")

function zeros(shape){
  return ndarray(shape)
}

module.exports = zeros

},{"./ndarray.js":31}],53:[function(require,module,exports){
module.exports = {
  apply: require("./apply.js"),
  array: require("./array.js"),
  assert: require("./assert.js"),
  downloadJSON: require("./download-json.js"),
  pause: require("./pause.js"),
  print: require("./print.js"),
}

},{"./apply.js":54,"./array.js":55,"./assert.js":56,"./download-json.js":57,"./pause.js":58,"./print.js":59}],54:[function(require,module,exports){
let vectorize = require("../math/vectorize.js")

let apply = vectorize(function(x, fn){
  return fn(x)
})

module.exports = apply

},{"../math/vectorize.js":51}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
module.exports = function(isTrue, message){
  if (!isTrue) throw new Error(message)
}

},{}],57:[function(require,module,exports){
function downloadJSON(obj, filename){
  let a = document.createElement("a")
  a.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, "\t"))}`
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

module.exports = downloadJSON

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
function print(x){
  return console.log(x)
}

module.exports = print

},{}]},{},[4]);

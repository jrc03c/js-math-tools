let map = require("../math/map.js")
let max = require("../math/max.js")
let downloadCanvas = require("./download-canvas.js")
let assert = require("../misc/assert.js")
let isUndefined = require("../math/is-undefined.js")
let isNumber = require("../math/is-number.js")
let isString = require("../math/is-string.js")
let isBoolean = require("../math/is-boolean.js")
let isArray = require("../math/is-array.js")
let isEqual = require("../math/is-equal.js")
let shape = require("../math/shape.js")
let flatten = require("../math/flatten.js")
let distrib = require("../math/distrib.js")

function Plot(canvas){
  assert(!isUndefined(canvas), "You must pass an HTML5 canvas element into the `Plot` constructor!")
  assert(canvas.constructor.name === "HTMLCanvasElement", "You must pass an HTML5 canvas element into the `Plot` constructor!")

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
    assert(!isUndefined(a), "You must pass a number between 0 and 1 into the plot's `setOpacity` method!")
    assert(isNumber(a), "You must pass a number between 0 and 1 into the plot's `setOpacity` method!")
    assert(a >= 0 && a <= 1, "You must pass a number between 0 and 1 into the plot's `setOpacity` method!")

    context.globalAlpha = a
    return self
  }

  self.setFillColor = function(c){
    assert(!isUndefined(c), "You must pass a color string into the plot's `setFillColor` method!")
    assert(isString(c), "You must pass a color string into the plot's `setFillColor` method!")

    fillColor = c
    return self
  }

  self.setLineColor = function(c){
    assert(!isUndefined(c), "You must pass a color string into the plot's `setLineColor` method!")
    assert(isString(c), "You must pass a color string into the plot's `setLineColor` method!")

    strokeColor = c
    return self
  }

  self.setDotSize = function(s){
    assert(!isUndefined(s), "You must pass a positive number into the plot's `setDotSize` method!")
    assert(isNumber(s), "You must pass a positive number into the plot's `setDotSize` method!")
    assert(s >= 0, "You must pass a positive number into the plot's `setDotSize` method!")

    dotSize = s
    return self
  }

  self.setLineThickness = function(t){
    assert(!isUndefined(t), "You must pass a positive number into the plot's `setLineThickness` method!")
    assert(isNumber(t), "You must pass a positive number into the plot's `setLineThickness` method!")
    assert(t >= 0, "You must pass a positive number into the plot's `setLineThickness` method!")

    lineThickness = t
    return self
  }

  self.setAxesAreVisible = function(v){
    assert(!isUndefined(v), "You must pass a boolean value into the plot's `setAxesAreVisible` method!")
    assert(isBoolean(v), "You must pass a boolean value into the plot's `setAxesAreVisible` method!")

    axesAreVisible = v
    return self
  }

  self.setTextStyle = function(t){
    assert(!isUndefined(t), "You must pass a text style string into the plot's `setTextStyle` method!")

    textStyle = t
    return self
  }

  self.setRange = function(a, b, c, d){
    assert(!isUndefined(a), "You must pass four numbers into the plot's `setRange` method!")
    assert(!isUndefined(b), "You must pass four numbers into the plot's `setRange` method!")
    assert(!isUndefined(c), "You must pass four numbers into the plot's `setRange` method!")
    assert(!isUndefined(d), "You must pass four numbers into the plot's `setRange` method!")
    assert(isNumber(a), "You must pass four numbers into the plot's `setRange` method!")
    assert(isNumber(b), "You must pass four numbers into the plot's `setRange` method!")
    assert(isNumber(c), "You must pass four numbers into the plot's `setRange` method!")
    assert(isNumber(d), "You must pass four numbers into the plot's `setRange` method!")
    assert(a < b, "The xmin value must be less than the xmax value in the plot's `setRange` method!")
    assert(c < d, "The ymin value must be less than the ymax value in the plot's `setRange` method!")

    xmin = a
    xmax = b
    ymin = c
    ymax = d
    return self
  }

  self.splitTextIntoLines = function(text, maxWidth){
    assert(!isUndefined(text), "You must pass a string and a positive number into the plot's `splitTextIntoLines` method!")
    assert(isString(text), "You must pass a string and a positive number into the plot's `splitTextIntoLines` method!")
    assert(!isUndefined(maxWidth), "You must pass a string and a positive number into the plot's `splitTextIntoLines` method!")
    assert(isNumber(maxWidth), "You must pass a string and a positive number into the plot's `splitTextIntoLines` method!")
    assert(maxWidth >= 0, "You must pass a string and a positive number into the plot's `splitTextIntoLines` method!")

    let lines = []
    let words = text.split(" ")
    let temp = ""

    words.forEach(function(word){
      let width = context.measureText(temp + " " + word).width

      if (width > maxWidth){
        lines.push(temp)
        temp = word
      } else {
        if (temp.length === 0) temp += word
        else temp += " " + word
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
    return self
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
    assert(!isUndefined(x), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `scatter` method!")
    assert(!isUndefined(y), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `scatter` method!")
    assert(isArray(x), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `scatter` method!")
    assert(isArray(y), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `scatter` method!")

    let xShape = shape(x)
    let yShape = shape(y)

    assert(xShape.length < 2, "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `scatter` method!")
    assert(yShape.length < 2, "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `scatter` method!")
    assert(isEqual(xShape, yShape), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `scatter` method!")

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
    assert(!isUndefined(x), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `line` method!")
    assert(!isUndefined(y), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `line` method!")
    assert(isArray(x), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `line` method!")
    assert(isArray(y), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `line` method!")

    let xShape = shape(x)
    let yShape = shape(y)

    assert(xShape.length < 2, "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `line` method!")
    assert(yShape.length < 2, "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `line` method!")
    assert(isEqual(xShape, yShape), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `line` method!")

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
    assert(!isUndefined(x), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `dottedLine` method!")
    assert(!isUndefined(y), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `dottedLine` method!")
    assert(isArray(x), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `dottedLine` method!")
    assert(isArray(y), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `dottedLine` method!")

    let xShape = shape(x)
    let yShape = shape(y)

    assert(xShape.length < 2, "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `dottedLine` method!")
    assert(yShape.length < 2, "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `dottedLine` method!")
    assert(isEqual(xShape, yShape), "You must pass two equally-sized one-dimensional arrays of numbers into the plot's `dottedLine` method!")

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
    assert(!isUndefined(values), "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")
    assert(!isUndefined(colors), "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")
    assert(isArray(values), "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")
    assert(isArray(colors), "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")

    let valuesShape = shape(values)
    let colorsShape = shape(colors)

    assert(valuesShape.length < 2, "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")
    assert(colorsShape.length < 2, "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")
    assert(isEqual(valuesShape, colorsShape), "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")

    values.forEach(function(value){
      assert(isNumber(value), "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")
    })

    colors.forEach(function(color){
      assert(isString(color), "You must pass two equally-sized one-dimensional arrays into the plot's `bar` method: an array of numeric values and array of color strings!")
    })

    let maxValue = max(values)
    self.setRange(1, 2 + values.length, -0.1 * maxValue, 1.1 * maxValue)

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

  self.hist = function(x, bins, isDensity){
    assert(!isUndefined(x), "You must pass an array of numbers (and optionally an integer number of bins and a boolean that determines whether or not to display the histogram as a density plot) into the plot's `hist` method!")
    assert(isArray(x), "You must pass an array of numbers (and optionally an integer number of bins and a boolean that determines whether or not to display the histogram as a density plot) into the plot's `hist` method!")

    let temp = flatten(x)
    temp.forEach(v => assert(isNumber(v), "You must pass an array of numbers (and optionally an integer number of bins and a boolean that determines whether or not to display the histogram as a density plot) into the plot's `hist` method!"))

    if (isUndefined(bins)){
      bins = parseInt(Math.sqrt(temp.length))
    } else {
      assert(isNumber(bins), "You must pass an array of numbers (and optionally an integer number of bins and a boolean that determines whether or not to display the histogram as a density plot) into the plot's `hist` method!")
      assert(bins === parseInt(bins), "You must pass an array of numbers (and optionally an integer number of bins and a boolean that determines whether or not to display the histogram as a density plot) into the plot's `hist` method!")
    }

    if (isUndefined(isDensity)){
      isDensity = false
    } else {
      assert(isBoolean(isDensity), "You must pass an array of numbers (and optionally an integer number of bins and a boolean that determines whether or not to display the histogram as a density plot) into the plot's `hist` method!")
    }

    let y = distrib(temp, bins)

    context.save()
    context.translate(width/2, height/2)
    context.scale(1, -1)
    self.drawAxes()
    context.fillStyle = fillColor
    context.strokeStyle = strokeColor
    context.lineWidth = lineThickness

    temp = apply(temp, v => map(v, xmin, xmax, -width/2, width/2))
    let start = min(temp)
    let stop = max(temp)
    let step = (stop - start) / bins
    x = range(start, stop, step)
    y = apply(y, v => map(v, 0, ymax - ymin, 0, height))

    if (isDensity){
      y = apply(y, v => v / temp.length)
    }

    for (let i=0; i<x.length; i++){
      context.fillRect(x[i], map(0, ymin, ymax, -height/2, height/2), step, y[i])
      context.strokeRect(x[i], map(0, ymin, ymax, -height/2, height/2), step, y[i])
    }

    context.restore()
    return self
  }

  self.text = function(text, x, y, rotation, maxWidth){
    assert(!isUndefined(text), "You must pass a string and two numbers for coordinates (and optionally a positive third number for the maximum width of the text) into the plot's `text` method!")
    assert(!isUndefined(x), "You must pass a string and two numbers for coordinates (and optionally a positive third number for the maximum width of the text) into the plot's `text` method!")
    assert(!isUndefined(y), "You must pass a string and two numbers for coordinates (and optionally a positive third number for the maximum width of the text) into the plot's `text` method!")

    assert(isString(text), "You must pass a string and two numbers for coordinates (and optionally a positive third number for the maximum width of the text) into the plot's `text` method!")
    assert(isNumber(x), "You must pass a string and two numbers for coordinates (and optionally a positive third number for the maximum width of the text) into the plot's `text` method!")
    assert(isNumber(y), "You must pass a string and two numbers for coordinates (and optionally a positive third number for the maximum width of the text) into the plot's `text` method!")

    if (!isUndefined(maxWidth)){
      assert(isNumber(maxWidth), "You must pass a string and two numbers for coordinates (and optionally a positive third number for the maximum width of the text) into the plot's `text` method!")
      assert(maxWidth >= 0, "You must pass a string and two numbers for coordinates (and optionally a positive third number for the maximum width of the text) into the plot's `text` method!")
    }

    context.save()
    context.translate(width/2, height/2)
    context.rotate(rotation)
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
    if (!isUndefined(filename)){
      assert(isString(filename), "You must pass a string (or nothing at all) into the plot's `download` method!")
    }

    filename = filename || "untitled.png"
    downloadCanvas(canvas, filename)
    return self
  }
}

module.exports = Plot

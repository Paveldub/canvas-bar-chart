'use strict'

function BarChart (targetId, width, height, data) {
  // Base
  let chart = this

  // Specify Configurations
  chart.configureChart(targetId, width, height, data)

  // Pre Operations
  chart.performPreOperations()

  // draw chart
  chart.drawChart()
}

BarChart.prototype.configureChart = function (targetId, width, height, data) {
  // Base
  let chart = this

  // Global Canvas Specifications
  chart.setCanvasParameters(targetId, width, height, data)

  // Global Chart Specifications
  chart.setChartParameters()
}

BarChart.prototype.setCanvasParameters = function (
  targetId,
  width,
  height,
  data
) {
  // Base
  let chart = this

  // Canvas Specifications come from outside
  chart.id = targetId
  chart.width = width
  chart.height = height
  chart.data = data
}

BarChart.prototype.setChartParameters = function () {
  // Base
  let chart = this

  // Axe Configurations
  chart.axisRatio = 10 // in terms of percentage
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100
  chart.axisColor = '#b1b1b1'
  chart.axisWidth = 0.75

  // Label Configurations
  chart.fontRatio = 3 // in terms of percentage
  chart.fontFamily = 'times'
  chart.fontStyle = 'normal'
  chart.fontWeight = '300'
  chart.fontColor = '#666'
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100

  // Guideline Configurations
  chart.guidelineColor = '#e5e5e5'
  chart.guidelineWidth = 0.5
}

BarChart.prototype.performPreOperations = function () {
  // Base
  let chart = this

  // Create Canvas
  chart.createCanvas()

  // Get data
  chart.handleData()

  // Prepare data
  chart.preapareData()
}

BarChart.prototype.createCanvas = function () {
  // Base
  let chart = this

  // Create Canvas
  let canvas = document.createElement('canvas')
  canvas.id = chart.id + '-' + Math.random()
  canvas.width = chart.width
  canvas.height = chart.height

  // Append canvas to target container
  document.getElementById(chart.id).innerHTML = '' // clean container
  document.getElementById(chart.id).appendChild(canvas) // add canvas to clean container

  // Add canvas to chart object
  chart.canvas = canvas
  chart.context = canvas.getContext('2d')
}

BarChart.prototype.handleData = function () {
  // Base
  let chart = this

  // Data sets
  chart.labels = []
  chart.values = []

  // Handle Data
  chart.data.forEach(function (item) {
    chart.labels.push(item.label)
    chart.values.push(item.value)
  })
}

BarChart.prototype.preapareData = function () {
  // Base
  let chart = this

  // Global letiables
  chart.itemsNum = chart.data.length
  chart.maxValue = Math.max.apply(null, chart.values)
  chart.minValue = Math.min.apply(null, chart.values)

  // Axis Specifications
  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin // bottom and top margins
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin // left and right margins

  // Label Specifications
  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10
  chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum
  chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum
}

BarChart.prototype.drawChart = function () {
  // Base
  let chart = this

  // vertical axis
  chart.drawVerticalAxis()

  // horizontal axis
  chart.drawHorintalAxis()

  // vertical labels
  chart.drawVerticalLabels()

  // horizontal labels
  chart.drawHorizontalLabels()

  // horizontal guidelines
  chart.drawHorintalGuidelines()

  // vertical guidelines
  chart.drawVerticalGuidelines()

  // Bars
  chart.drawBars()
}

BarChart.prototype.drawVerticalAxis = function () {
  // Base
  let chart = this

  // vertical axis
  chart.context.beginPath()
  chart.context.strokeStyle = chart.axisColor
  chart.context.lineWidth = chart.axisWidth
  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin)
  chart.context.lineTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  )
  chart.context.stroke()
}

BarChart.prototype.drawHorintalAxis = function () {
  // Base
  let chart = this

  // Horizontal axis
  chart.context.beginPath()
  chart.context.strokeStyle = chart.axisColor
  chart.context.lineWidth = chart.axisWidth
  chart.context.moveTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  )
  chart.context.lineTo(
    chart.width - chart.horizontalMargin,
    chart.height - chart.verticalMargin
  )
  chart.context.stroke()
}

BarChart.prototype.drawVerticalLabels = function () {
  // Base
  let chart = this

  // Text Specifications
  let labelFont =
    chart.fontStyle +
    ' ' +
    chart.fontWeight +
    ' ' +
    chart.verticalFontSize +
    'px ' +
    chart.fontFamily
  chart.context.font = labelFont
  chart.context.textAlign = 'right'
  chart.context.fillStyle = chart.fontColor

  // Scale Values
  let scaledVerticalLabelFreq =
    (chart.verticalAxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFreq

  // Draw labels
  for (let i = 0; i <= chart.itemsNum; i++) {
    let labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq
    let verticalLabelX =
      chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio
    let verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq

    chart.context.fillText(labelText, verticalLabelX, verticalLabelY)
  }
}

BarChart.prototype.drawHorizontalLabels = function () {
  // Base
  let chart = this

  // Text Specifications
  let labelFont =
    chart.fontStyle +
    ' ' +
    chart.fontWeight +
    ' ' +
    chart.verticalFontSize +
    'px ' +
    chart.fontFamily
  chart.context.font = labelFont
  chart.context.textAlign = 'center'
  chart.context.textBaseline = 'top'
  chart.context.fillStyle = chart.fontColor

  // Draw labels
  for (let i = 0; i < chart.itemsNum; i++) {
    let horizontalLabelX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFreq +
      chart.horizontalLabelFreq / 2
    let horizontalLabelY =
      chart.height -
      chart.verticalMargin +
      chart.verticalMargin / chart.axisRatio

    chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY)
  }
}

BarChart.prototype.drawHorintalGuidelines = function () {
  // Base
  let chart = this

  // specifications
  chart.context.strokeStyle = chart.guidelineColor
  chart.context.lineWidth = chart.guidelineWidth

  // Scale Values
  let scaledVerticalLabelFreq =
    (chart.verticalAxisWidth / chart.verticalUpperBound) *
    chart.verticalLabelFreq

  // Draw labels
  for (let i = 0; i <= chart.itemsNum; i++) {
    // starting point coords
    let horizontalGuideLineStartX = chart.horizontalMargin
    let horizontalGuideLineStartY =
      chart.verticalMargin + i * scaledVerticalLabelFreq

    // end point coords
    let horizontalGuideLineEndX =
      chart.horizontalMargin + chart.horizontalAxisWidth
    let horizontalGuideLineEndY =
      chart.verticalMargin + i * scaledVerticalLabelFreq

    chart.context.beginPath()
    chart.context.moveTo(horizontalGuideLineStartX, horizontalGuideLineStartY)
    chart.context.lineTo(horizontalGuideLineEndX, horizontalGuideLineEndY)
    chart.context.stroke()
  }
}

BarChart.prototype.drawVerticalGuidelines = function () {
  // Base
  let chart = this

  // specifications
  chart.context.strokeStyle = chart.guidelineColor
  chart.context.lineWidth = chart.guidelineWidth

  // draw vertical lines
  for (let i = 0; i <= chart.itemsNum; i++) {
    // Starting point coords
    let verticalGuideLineStartX =
      chart.horizontalMargin + i * chart.horizontalLabelFreq
    let verticalGuideLineStartY = chart.height - chart.verticalMargin

    // End point coords
    let verticalGuidelineEndX =
      chart.horizontalMargin + i * chart.horizontalLabelFreq
    let verticalGuidelineEndY = chart.verticalMargin

    chart.context.beginPath()
    chart.context.moveTo(verticalGuideLineStartX, verticalGuideLineStartY)
    chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY)
    chart.context.stroke()
  }
}

BarChart.prototype.drawBars = function () {
  // Base
  let chart = this

  for (let i = 0; i < chart.itemsNum; i++) {
    let color = chart.createRandomRGBColor()
    let fillOpacity = '0.3'
    let fillColor =
      'rgba(' +
      color.r +
      ', ' +
      color.g +
      ', ' +
      color.b +
      ', ' +
      fillOpacity +
      ')'

    let borderColor = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ')'

    chart.context.beginPath()

    let barX =
      chart.horizontalMargin +
      i * chart.horizontalLabelFreq +
      chart.horizontalLabelFreq / chart.axisRatio
    let barY = chart.height - chart.verticalMargin
    let barWidth =
      chart.horizontalLabelFreq -
      (2 * chart.horizontalLabelFreq) / chart.axisRatio
    let barHeight =
      (-1 * chart.verticalAxisWidth * chart.values[i]) / chart.maxValue

    chart.context.fillStyle = fillColor
    chart.context.strokeStyle = borderColor
    chart.context.rect(barX, barY, barWidth, barHeight)
    chart.context.stroke()
    chart.context.fill()
  }
}
BarChart.prototype.createRandomRGBColor = function () {
  let red = getRandomInt(0, 257)
  let green = getRandomInt(0, 257)
  let blue = getRandomInt(0, 257)

  return { r: red, g: green, b: blue }
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

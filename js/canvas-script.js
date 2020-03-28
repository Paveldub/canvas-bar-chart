document.addEventListener('DOMContentLoaded', () => {
  let min = 1
  let max = 200

  // chart data
  let data = [
    { label: 'Jan', value: getRandomInt(min, max) },
    { label: 'Feb', value: getRandomInt(min, max) },
    { label: 'March', value: getRandomInt(min, max) },
    { label: 'April', value: getRandomInt(min, max) },
    { label: 'May', value: getRandomInt(min, max) }
  ]

  // chart specifications
  let targetId = 'chart'
  let canvasWidth = 600
  let canvasHeight = 450

  // create chart
  let chart = new BarChart(targetId, canvasWidth, canvasHeight, data)

  function getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
})

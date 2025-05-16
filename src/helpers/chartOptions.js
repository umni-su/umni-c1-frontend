export const baseOptions = {
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  grid: {
    left: '80px',
    right: '50px',
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
    scale: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: []
}

export const gradientOptions = {
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 100,
      inRange: {
        color: ['#4CAF50', '#FFB74D', '#F44336'],
        //symbolSize: [30, 100]
      }
    }
  ],
}

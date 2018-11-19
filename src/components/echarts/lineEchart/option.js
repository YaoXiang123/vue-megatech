export const option = {
  // dataZoom: [
  //   {
  //     show: true,
  //     realtime: true,
  //     start: 65,
  //     end: 85
  //   },
  //   {
  //     type: 'inside',
  //     realtime: true,
  //     start: 65,
  //     end: 85
  //   }
  // ],
  color: [ '#fd433f', '#4f8aff' ],
  tooltip: {
    trigger: 'item',
    triggerOn: 'click',
    confine: 'true',
    backgroundColor: '#ffa62f',
    position: function (p) {
      return [p[0] - 40, p[1] - 10]
    },
    formatter: function (param) {
      let arr = peakNews.data[param.dataIndex]
      let arr2 = []
      if (peakNews.data[param.dataIndex].length > 14) {
        arr = peakNews.data[param.dataIndex].slice(0, 24)
        arr2 = peakNews.data[param.dataIndex].slice(24, peakNews.data[param.dataIndex].length)
      } else {
        return arr
      }
      return '<p>' + arr + '</p><p>' + arr2 + '</p> '
    }
  },
  legend: {
    top: 0,
    right: 0,
    itemHeight: 4,
    itemWidth: 6,
    textStyle: {
      color: '#999999'
    },
    data: [{name: '社交平台', icon: 'roundRect'}, {name: '新闻媒体', icon: 'roundRect'}]
  },
  grid: {
    left: 20,
    right: 20,
    top: 50,
    bottom: 20
  }, // 整个图例的位置
  calculable: true,
  xAxis: [
    {
      // boundaryGap: ['1%', '1%'],
      type: 'category',
      boundaryGap: false,
      data: [ '7/20', '7/21', '7/22', '7/23', '7/24', '7/25', '7/26' ],
      axisLine: {
        show: false,
        lineStyle: {
          color: '#999999'
        }
      }
    }
  ],
  yAxis: [
    {
      // boundaryGap: ['1%', '1%'],
      offset: -5,
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed', // 网格线虚线
          color: '#f2f2f2'
        }
      },
      max: 10,
      interval: 2,
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#999999'
        }
      },
      // axisTick: {
      //   show: false,
      //   inside: true
      // },
      axisLabel: {
        align: 'left'
      }
    }
  ],
  series: [
    {
      name: '社交平台',
      type: 'line',
      lineStyle: {shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffsetY: '5',
        shadowBlur: 2},
      stack: '总量',
      smooth: true,
      symbolSize: 8,
      symbol: 'none',
      data: [ {value: 4, text: '123'}, 7, 9, 9,
        {value: 8, symbolSize: 15, symbolKeepAspect: true}, 9, 4 ]
    },
    {
      name: '新闻媒体',
      type: 'line',
      lineStyle: {shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffsetY: '5',
        shadowBlur: 3},
      symbolSize: 8,
      smooth: true,
      symbol: 'none',
      data: [
        2, {value: 0, symbolSize: 15, symbol: 'path://M514.56 138.24l112.64 225.28c7.68 15.36 20.48 25.6 38.4 28.16l248.32 38.4-179.2 174.08c-12.8 12.8-17.92 28.16-15.36 46.08l43.52 253.44L537.6 783.36c-7.68-5.12-15.36-5.12-23.04-5.12-7.68 0-17.92 2.56-25.6 5.12l-222.72 122.88 46.08-245.76c2.56-17.92-2.56-33.28-15.36-46.08l-189.44-181.76 250.88-35.84c15.36-2.56 30.72-12.8 38.4-28.16L514.56 138.24M514.56 25.6l-161.28 317.44-353.28 51.2 266.24 256L197.12 1000.96l320-174.08 314.88 163.84L770.56 640l250.88-245.76-348.16-53.76L514.56 25.6 514.56 25.6z'}, 2, 8, 9, 1, 2
      ]
    }
  ]
}
export const peakNews = {
  data: {}
}
